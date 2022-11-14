import React, { use } from "react";
import { StyledRegisterVideo } from "./Styles";
import { createClient } from '@supabase/supabase-js'

function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (evento) => {
            console.log(evento.target);
            const value = evento.target.value;
            const name = evento.target.name;
            console.log(evento.target.name);
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}


const supabaseUrl = "https://thzxqyknqgeebhmxhujh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoenhxeWtucWdlZWJobXhodWpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg2MzY5NzcsImV4cCI6MTk4NDIxMjk3N30.zLRGVAvhRarGO7zot14U6S3bAWchoxtTGLBuuQIvM6E";
const supabase = createClient(supabaseUrl, supabaseKey);
// const supabaseKey = process.env.SUPABASE_KEY

//get youtube thumbnail from video url
function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

// function getVideoId(url) {
//     const videoId = url.split("v=")[1];
//     const ampersandPosition = videoId.indeoxOf("&");
//     if (ampersandPosition !== -1){
//         return videoId.substring(0, ampersandPosition);
//     }
//     return videoId;
// }

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "Frost Punk", url: "https://www.youtube.com/watch?v=QsqatJxAUtk" }
    });
    const [formVisivel, setFormVisivel] = React.useState(false);

    // console.log(supabase);
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
                        console.log(formCadastro.values);

                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: "jogos",
                        })
                        .then((oqueveio) => {
                            console.log(oqueveio);
                        })
                        .catch((err) => {
                            console.log(err);
                        })

                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                x
                            </button>
                            <input
                                placeholder="Título do Vídeo"
                                name="titulo"
                                value={formCadastro.values.titulo}
                                onChange={formCadastro.handleChange}
                            />
                            <input
                                placeholder="URL"
                                name="url"
                                value={formCadastro.values.url}
                                onChange={formCadastro.handleChange}
                            />
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