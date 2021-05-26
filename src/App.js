import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listPhrases } from './graphql/queries';
import { createPhrase as createPhraseMutation, deletePhrase as deletePhraseMutation } from './graphql/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import AmazonAdvertisementCustom from './components/AmazonAdvertisementCustom'
import AmazonAdvertisement from './components/AmazonAdvertisement'
const initialFormState = { word: '', description: '' }

const divs = [
  '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=amazonmaxist-20&marketplace=amazon&amp;region=US&placement=B08CW368CJ&asins=B08CW368CJ&linkId=a6b43f3b857c8d33d4ac9dcc782a3543&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  , '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=amazonmaxist-20&marketplace=amazon&amp;region=US&placement=B07VWP4FLG&asins=B07VWP4FLG&linkId=4bd741a6056797c11a05f9e5889e0f01&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  , '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=amazonmaxist-20&marketplace=amazon&amp;region=US&placement=B01N0Y5BWX&asins=B01N0Y5BWX&linkId=54ed28adff07522a3e7adafe20710348&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  , '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=amazonmaxist-20&marketplace=amazon&amp;region=US&placement=B08J3QVQ4P&asins=B08J3QVQ4P&linkId=a7b27eaf4e51c3c4e956fd4541581341&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  , '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=amazonmaxist-20&marketplace=amazon&amp;region=US&placement=B00451U9Q0&asins=B00451U9Q0&linkId=bb773a30bc6c6c10cad81f4325b1b157&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  , '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=amazonmaxist-20&marketplace=amazon&amp;region=US&placement=B091V5V2V8&asins=B091V5V2V8&linkId=ff5699cdfec5a6f802b2194ec764aa6a&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  , '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=amazonmaxist-20&marketplace=amazon&amp;region=US&placement=B07TY3N23Q&asins=B07TY3N23Q&linkId=f92c7209cb0a97dd3941392530e4c04b&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  , '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=amazonmaxist-20&marketplace=amazon&amp;region=US&placement=B0783NJ9BQ&asins=B0783NJ9BQ&linkId=84acb6e6be519acfd30af08ea91e9030&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  , ''
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
      <div className="content">
        <h1>Create Phrase</h1>

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
        <h1>Phrases and Words</h1>
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
      <h3>You must disable ad-block to see affiliate links</h3>


      <AmazonAdvertisementCustom divs={divs}>
      </AmazonAdvertisementCustom>
      <AmazonAdvertisement></AmazonAdvertisement>

      <div className="footer">
        <h1>Site Map</h1>
        <a href="https://smile.amazon.com">amazon.com</a>
      </div>

    </div >
  );
}
export default withAuthenticator(App);