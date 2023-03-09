import React, {useState} from "react";


const SharePost = ({ text, title, date }) => {

    const url = typeof window !== 'undefined' ? window.location.href : '';

    const shareDetails = { url, title, text }

    const handleSharing = async () => {
      if (navigator.share) {
        try {
          await navigator
            .share(shareDetails)
            .then(() =>
              console.log("Hooray! Your content was shared to tha world")
            )
        } catch (error) {
          console.log(`Oops! I couldn't share to the world because: ${error}`);
        }
      } else {
        // fallback code
        console.log(
          "Web share is currently not supported on this browser. Please provide a callback"
        )
      }
    }

    const [done, setDone] = useState(false)

    const copyLink = () => {
        window.navigator.clipboard.writeText(url)

        setDone(true)

        setTimeout(() => {
            setDone(false)
        }, 5000)
    }

    return (
        <div>
            {/* <div>
            <a href={`https://t.me/share/url?url=${url}&text=${title}`} target="_blank" rel="noreferrer">
                <TelegramIcon size={25} />
            </a>
            </div> */}

            <button onClick={handleSharing}>
                Share
            </button>

            <button onClick={copyLink} className={done ? 'copied' : null}>
                Копировать
            </button>
        </div>
    )
}

export default SharePost
