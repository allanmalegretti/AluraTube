import React from "react";
import { StyledRegisterVideo } from "./Styles";

export default function RegisterVideo() {
    const [formVisivel, setFormVisivel] = React.useState(false);
    const [values, setValues] = React.useState({ titulo: "", url: "" });

    // console.log(formVisivel);

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>

            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        console.log(values);
                    }}>
                        <div>
                            <button className="close-modal" onClick={() => setFormVisivel(false)}>
                                x
                            </button>
                            <input placeholder="Título do Vídeo"
                                value={values.titulo}
                                onChange={(evento) => {
                                    const value = evento.target.value;
                                    console.log(value);
                                    setValues({
                                        ...values,
                                        titulo: value,
                                    });
                                }} />
                            <input placeholder="URL"
                                value={values.url}
                                onChange={(evento) => {
                                    const value = evento.target.value;
                                    console.log(value);
                                    setValues({
                                        ...values,
                                        url: value,
                                    });
                                }} />
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                )
                : false}
        </StyledRegisterVideo>
    )
}