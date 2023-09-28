import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpeech } from "./action";
import { useState } from "react";
import { easeInOut, motion, useAnimation } from "framer-motion";

function App() {
  const [query, setQuery] = useState("");
  const { data, status, error } = useSelector((state) => state.post);
  const [speechUrl, setspeechUrl] = useState();
  const [downloadDisplay, setDownloadDisplay] = useState(false);

  //   console.log(data?.result?.audio_url);

  const textAreaControl = useAnimation();

  const dispatch = useDispatch();

  const handleText = async () => {
    await textAreaControl.start({
      scale: 0.97,
      transition: {
        ease: easeInOut,
        duration: 0.2,
      },
    }),
      await textAreaControl.start({
        scale: 1,
        transition: {
          ease: easeInOut,
          duration: 0.2,
        },
      });
  };

  const handleTextarea = async () => {
    await textareaControls.start({
      scale: 0.97,
      transition: {
        ease: easeInOut,
        duration: 0.1,
      },
    });

    await textareaControls.start({
      scale: 1,
      transition: {
        ease: easeInOut,
        duration: 0.1,
      },
    });
  };

  useEffect(() => {
    if (data && data.result) {
      setspeechUrl(data.result.audio_url);
    }
  }, [data]);

  const handleDispatch = () => {
    dispatch(getSpeech({ query }));
    setDownloadDisplay(true);
    setQuery("");
  };

  const handleChanges = (e) => {
    setQuery(e.target.value);

    setDownloadDisplay(false);
  };

  if (status === "loading") {
    return <h1>Loading</h1>;
  }

  if (status === "error") {
    return <h1>Something went Wrong:{error}</h1>;
  }

  return (
    <div>
      <h1>
        Text to <span style={{ color: "blue" }}>Speech</span> Converter{" "}
      </h1>

      <div className="inputContainer">
        <motion.textarea
          style={{ outline: "none" }}
          onMouseEnter={handleText}
          initial={{ scale: 1 }}
          animate={textAreaControl}
          rows="5"
          cols="30"
          onChange={handleChanges}
          placeholder="Enter Text to be converted to Speech"
        ></motion.textarea>
        <button
          className="processBtn"
          onClick={handleDispatch}
          disabled={query === ""}
        >
          Process
        </button>
      </div>

      {downloadDisplay && (
        <div className="downloadContainer">
          <a href={speechUrl && speechUrl}>
            <button
              className="downloadBtn"
              onClick={() => setDownloadDisplay(false)}
            >
              Download Audio Speech
            </button>
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
