import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listPhrases } from './graphql/queries';
import { createPhrase as createPhraseMutation, deletePhrase as deletePhraseMutation } from './graphql/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
const initialFormState = { word: '', description: '' }

function App() {
  const [phrases, setPhrases] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [uploadStatus, setUploadStatus] = useState("Optional: Upload Photo")
  useEffect(() => {
    fetchPhrases();
  }, []);

  async function fetchPhrases() {
    const apiData = await API.graphql({ query: listPhrases });
    const phrasesFromAPI = apiData.data.listPhrases.items;
    await Promise.all(phrasesFromAPI.map(async phrase => {
      if (phrase.image) {
        const image = await Storage.get(phrase.image);
        phrase.image = image;
      }
      return phrase;
    }))
    setPhrases(apiData.data.listPhrases.items);
  }

  async function createPhrase() {
    if (!formData.word || !formData.description) {
      alert("Missing required* input")
      return
    };
    await API.graphql({ query: createPhraseMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setPhrases([...phrases, formData]);
    setFormData(initialFormState);
    setUploadStatus("Optional: Upload Photo")
  }

  async function deletePhrase({ id }) {
    const newPhrasesArray = phrases.filter(phrase => phrase.id !== id);
    setPhrases(newPhrasesArray);
    await API.graphql({ query: deletePhraseMutation, variables: { input: { id } } });

  }

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    setUploadStatus("File Ready for Upload")
    fetchPhrases();
  }

  return (
    <div className="App">
      <div className="header">
        <h1 className="title">Language for Dummies</h1>
        <AmplifySignOut />
      </div>
      <div class="content">
        <h2>Create Phrase</h2>

        <div className="flex-container user-input">

          <input
            className="ninety-percent-width"
            onChange={e => setFormData({ ...formData, 'word': e.target.value })}
            placeholder="Phrase word*"
            value={formData.word}

          />
          <input
            className="ninety-percent-width"
            onChange={e => setFormData({ ...formData, 'description': e.target.value })}
            placeholder="Phrase description*"
            value={formData.description}

          />
          <div className="two-btn-container">

            <label htmlFor="file-upload" className="file-upload">
              <FontAwesomeIcon className="fa-cloud-upload-alt" icon={faCloudUploadAlt} size="2x" />
              <span> {uploadStatus} </span>
            </label>



            <input
              id="file-upload"
              type="file"
              onChange={onChange}
            />


            <button className="button5" onClick={createPhrase}>Create Phrase for Alexa</button>

          </div>
        </div>
        <h2>Phrases and Words</h2>
        <div className="flex-container phrases" style={{ marginBottom: 30 }} >
          {
            phrases.map(phrase => (
              <div key={phrase.id || phrase.word}>
                <button className="delete-x" onClick={() => deletePhrase(phrase)}><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></button>
                <span>{phrase.word} : </span>
                <span>{phrase.description}</span>
                {
                  phrase.image && <img src={phrase.image} />
                }
              </div>
            ))
          }
        </div>
      </div>

      <div className="footer">

      </div>
    </div >
  );
}

export default withAuthenticator(App);