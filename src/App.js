import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listPhrases } from './graphql/queries';
import { createPhrase as createPhraseMutation, deletePhrase as deletePhraseMutation } from './graphql/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import FlexHorizontalComponents from './components/FlexHorizontalComponents'
const initialFormState = { word: '', description: '' }

const divs = [
  '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=amazonmaxist-20&marketplace=amazon&amp;region=US&placement=B079QHML21&asins=B079QHML21&linkId=8252290a5d721949708de87f42696902&show_border=false&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  , '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=amazonmaxist-20&marketplace=amazon&amp;region=US&placement=B07XJ8C8F5&asins=B07XJ8C8F5&linkId=1ff12f1a1a18f001e35eecd99673d9df&show_border=false&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  , '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=amazonmaxist-20&marketplace=amazon&amp;region=US&placement=B07FZ8S74R&asins=B07FZ8S74R&linkId=a5f51434ccb78709154f7a31909c380a&show_border=false&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  , '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=amazonmaxist-20&marketplace=amazon&amp;region=US&placement=B07XJ8C8F7&asins=B07XJ8C8F7&linkId=ea17bbd29c74afe845f1497f11892d86&show_border=false&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  , '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=amazonmaxist-20&marketplace=amazon&amp;region=US&placement=B084DCJKSL&asins=B084DCJKSL&linkId=f9c33f58b462e6e0dc4870f65c5e45cd&show_border=false&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  , '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=amazonmaxist-20&marketplace=amazon&amp;region=US&placement=B07HZLHPKP&asins=B07HZLHPKP&linkId=af784cf12ce06d0534e265c4a5fb9540&show_border=false&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  , '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=amazonmaxist-20&marketplace=amazon&amp;region=US&placement=B07XKF5RM3&asins=B07XKF5RM3&linkId=a9b5121af2795061a40b607b84d06a27&show_border=false&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'

]
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

      <FlexHorizontalComponents divs={divs}>
      </FlexHorizontalComponents>
      <div className="footer">
        <h3>Site Map</h3>
        <a href="https://smile.amazon.com">amazon.com</a>
      </div>

    </div >
  );
}
export default withAuthenticator(App);