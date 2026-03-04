import axios from "axios";

export default function RandomImage(setState, state) {
    const root = document.querySelector(":root");
    const width = root.clientWidth;
    const height = root.clientHeight;

    const url = `https://picsum.photos/${width}/${height}`;

    axios
        .get(url)
        .then((response) => {
            if (response.status === 200) {
                console.log(response.request.responseURL);
                setState({
                    ...state,
                    image: {
                        ...state.image,
                        url: response.request.responseURL,
                    },
                    active: "random image",
                });
                root.style.setProperty("--DesktopBkgrImage", `url(${response.request.responseURL})`);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
