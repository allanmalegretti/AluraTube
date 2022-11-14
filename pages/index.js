import React from "react";
import config from "../config.json";
import styled from "styled-components";
// import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://thzxqyknqgeebhmxhujh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoenhxeWtucWdlZWJobXhodWpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg2MzY5NzcsImV4cCI6MTk4NDIxMjk3N30.zLRGVAvhRarGO7zot14U6S3bAWchoxtTGLBuuQIvM6E";
const supabase = createClient(supabaseUrl, supabaseKey);

function HomePage() {

  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  const [playlists, setPlayLists] = React.useState({});
  // const playlists = {
  //   "jogos": [],
  // };

  React.useEffect(() => {
    console.log("useEffect")

    supabase.from("video")
      .select("*")
      .then((dados) => {
        console.log(dados.data);

        const novasPlaylists = { ...playlists };
        dados.data.forEach((video) => {
          if (!novasPlaylists[video.playlist]) {
            novasPlaylists[video.playlist] = [];
          }
          novasPlaylists[video.playlist].push(video);
        })
        setPlayLists(novasPlaylists);
        // console.log(playlists);
      });
  }, []);

  return (
    <>
      {/* <CSSReset /> */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        // backgroundColor: "red",
      }}>
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>
          Conteudo
        </Timeline>
      </div>
    </>
  );
}

export default HomePage

// function Menu() {
//   return (
//     <div>
//       Menu
//     </div>
//   )
// }

const StyledHeader = styled.div`
background-color: ${({ theme }) => theme.backgroundLevel1};
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .user-info {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 16px 32px;
      gap: 16px;
    }
  `;

const StyledBanner = styled.div`
  background-color: lightblue;
  /* background-image: url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"); */
  /* background-image: url(${config.bg}); */
  background-image: url(${({ bg }) => bg});
  height: 230px;
`;

function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  )
}

function Timeline({ searchValue, ...propriedades }) {
  // console.log("dentro do componente", propriedades.playlists);
  const playlistNames = Object.keys(propriedades.playlists);

  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = propriedades.playlists[playlistName];
        // console.log(playlistName);
        // console.log(videos);
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos.filter((video) => {
                const titleNormalized = video.title.toLowerCase();
                const searchValueNormalized = searchValue.toLowerCase();
                return titleNormalized.includes(searchValueNormalized)
              }).map((video) => {
                return (
                  <a key={video.url} href={video.url}>
                    <img src={video.thumb} />
                    <span>
                      {video.title}
                    </span>
                  </a>
                )
              })}
            </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}