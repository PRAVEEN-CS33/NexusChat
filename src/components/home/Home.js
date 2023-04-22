import "./home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { useSpeechSynthesis } from "react-speech-kit";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useState } from "react";
import Fetch from "../Fetch";
import axios from "axios";

const Home = () => {
  const [listen, setListen] = useState(true);
  // const [inputShown, setInputShown] = useState('');
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [queryInfo, setQueryInfo] = useState([]);
  const [voiceAssist, setVoiceAssist] = useState(true);
  // const queryInfo = [{id: 1, input : "Hi", output: "Hello! How can I assist you today?"},{id: 2,input : "Just wanted to say hi and nothing much", output: "Hi there! That's perfectly fine. If you have any questions or if there's anything else I can help you with, feel free to let me know."},{id: 3,input : "Give me some random paragraph", output: "The sun was setting behind the mountains, casting long shadows across the valley. A cool breeze blew through the trees, rustling their leaves and sending a shower of golden light dancing across the forest floor. Birds sang their evening songs, and a family of deer grazed peacefully in a nearby meadow. As the light faded, the stars began to appear, one by one, twinkling like diamonds in the darkening sky. It was a peaceful and serene scene, a moment of stillness in a world that often seemed chaotic and unpredictable."}];

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    startListening,
    stopListening,
  } = useSpeechRecognition({
    autoStart: false, // don't automatically start listening
    interimResults: true, // show interim results as the user speaks
    recognitionOptions: {
      timeout: 20000, // set timeout to 20 seconds
    },
  });

  useEffect(() => {
    setInput(input + transcript);
  }, [transcript]);

  useEffect(() => {
    const addQuery = { input: input, output: output };
    setQueryInfo([...queryInfo, addQuery]);
    if (voiceAssist === true) speak({ text: output });
  }, [output]);

  const { speak } = useSpeechSynthesis();
  // const voices = useSpeechSynthesis.getVoices();
  // const femaleVoice = voices.find(voice => voice.name === 'Google US English Female')

  const handleVoiceAssist = () => {
    setVoiceAssist(!voiceAssist);
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleSend = async (event) => {
    // Fetch(input, setOutput);
    // console.log(queryInfo[id-1]);
    event.preventDefault();
    try {
      const response = await axios.post("http://f27c-34-147-98-10.ngrok-free.app", {
        data: input,
      });
      setOutput(response.data.text);
      console.log(voiceAssist);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      // Fetch(input, setOutput);
      try {
        const response = await axios.post("http://f27c-34-147-98-10.ngrok-free.app", {
          data: input,
        });
        setOutput(response.data.text);
        console.log(response.data.text);
        console.log(voiceAssist);
      } catch (error) {
        console.error(error);
      }
    }
    // setInput("");
  };
  const handleMic = () => {
    setListen(!listen);
    console.log(listen);
    if (listen) SpeechRecognition.startListening();
    else SpeechRecognition.stopListening();
  };

  return (
    <div className="home-parent">
      <div className="animate__animated animate__zoomInDown">
        <div className="navbar">
          <div className="logo-container">
            <div className="logo"></div>
          </div>
          <div className="user-cerd">
            <button className="login">LOGIN</button>
            <button className="voice-assist" onClick={handleVoiceAssist}>
              {voiceAssist ? (
                <FontAwesomeIcon icon={faVolumeHigh} size="2x" />
              ) : (
                <FontAwesomeIcon icon={faVolumeMute} size="2x" />
              )}
            </button>
          </div>
        </div>
        <div className="chat-response">
          {queryInfo.map((query, index) => (
            <div key={index} className="response">
              {query.input && <p className="input">{query.input}</p>}
              {query.output && <p className="output">{query.output}</p>}
            </div>
          ))}
        </div>
        <div className="input-area">
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="chat-send">
            <button onClick={handleSend}>
              <FontAwesomeIcon icon={faPaperPlane} size="2x" />
            </button>
          </div>
          <div className="chat-mic">
            <button onClick={handleMic}>
              <FontAwesomeIcon icon={faMicrophone} size="2x" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
