export function Home() {
  return (
    <>
      <h2>Ranker</h2>
      <p>Ranker is a Discord ranking bot. It offers customisable rank cards and a leaderboard.</p>
      <br />
      <h2>Want to invite our public bot?</h2>
      <p>You can invite our bot from <a href={'https://discord.com/api/oauth2/authorize?client_id=' + import.meta.env.VITE_CLIENT_ID + '&permissions=268445697&scope=bot%20applications.commands'} target="_blank">here.</a></p>
      <br />
      <h2>Want to self-host or get support?</h2>
      <p>You can get started at <a href="https://github.com/Ranker-Team/Ranker" target="_blank">our repository on GitHub.</a></p>
      <br />
      <h2>Contributors</h2>
      <p>We'd like to thank our contributors for making this possible.</p>
      <ul class="contributorsUl">
        <li><a href="https://github.com/SapphireDisD" target="_blank">@SapphireDisD</a>, <a href="https://github.com/dongle-the-gadget" target="_blank">@dongle-the-gadget</a>: Ranker's authors.</li>
        <li><a href="https://github.com/Ahmed605" target="_blank">@Ahmed605</a>: Ranker's main rank card main developer.</li>
        <li><a href="https://github.com/zeealeid" target="_blank">@zeealeid</a>: Ranker's main rank card main designer.</li>
        <li><a href="https://github.com/KojiOdyssey" target="_blank">@KojiOdyssey</a>, <a href="https://github.com/dAKirby309" target="_blank">@dAKirby309</a>, <a href="https://github.com/itsWindows11" target="_blank">@itsWindows11</a>: Ranker's main rank card design collaborators.</li>
        <li><a href="https://discord.com/users/188482204601548800" target="_blank">Fleuron</a>: Ranker's second rank card designer.</li>
        <li><a href="https://github.com/Erisa" target="_blank">@Erisa</a>: Docker support.</li>
      </ul>
    </>
  )
}
