import React, { Component } from "react";
import "./App.css";
import Messages from "./Messages";
import Input from "./Input";

function randomName() {
  const adjectives = [
    "jesenji",
    "skriveni",
    "gorki",
    "mistični",
    "tihi",
    "prazni",
    "suhi",
    "mračni",
    "ljetni",
    "ledeni",
    "bijeli",
    "otkvačeni",
    "proljetni",
    "zimski",
    "strpljivi",
    "damski",
    "kriminalni",
    "šaputavi",
    "vremenski",
    "plavi",
    "voljeni",
    "slomljeni",
    "hladni",
    "ostavljeni",
    "padajući",
    "ledeni",
    "zeleni",
    "dugi",
    "kasni",
    "veseli",
    "debeli",
    "pametni",
    "jutarnji",
    "ludi",
    "srednjovječni",
    "rumeni",
    "grubi",
    "mirni",
    "mali",
    "svjetlucavi",
    "sjajni",
    "hodajući",
    "ruzinavi",
    "divlji",
    "crni",
    "mladi",
    "sveti",
    "prizemni",
    "stari",
    "snježni",
    "ponosni",
    "cvjetni",
    "mirisni",
    "odani",
    "sjajni",
    "davni",
    "rozi",
    "živahni",
    "bezimeni",
  ];
  const nouns = [
    "vodopad",
    "potok",
    "povjetarac",
    "mjesec",
    "mraz",
    "vjetar",
    "kralj",
    "princ",
    "snijeg",
    "kaktus",
    "podne",
    "bor",
    "smijeh",
    "list",
    "tigar",
    "šumar",
    "brijeg",
    "oblak",
    "pašnjak",
    "leopard",
    "mač",
    "jarac",
    "konj",
    "leptir",
    "ovan",
    "tanjur",
    "nos",
    "prst",
    "cvijet",
    "plamen",
    "pero",
    "komarac",
    "plamenac",
    "rak",
    "mjesec",
    "ovan",
    "mračnjak",
    "snjegović",
    "kišobran",
    "zvuk",
    "svod",
    "oblik",
    "val",
    "grom",
    "kaktus",
    "slap",
    "bumbar",
    "indijanac",
    "hrast",
    "dupin",
    "jablan",
    "san",
    "jazavac",
    "grm",
    "krov",
    "led",
    "zvuk",
    "papir",
    "toranj",
    "dim",
    "satelit",
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    },
  };

  constructor() {
    super();
    this.drone = new window.Scaledrone("XrjsXfFYHEBWJC1Y", {
      data: this.state.member,
    });
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      const messages = [...this.state.messages];
      messages.push({ member, text: data });
      this.setState({ messages });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>My Chat App</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message,
    });
  };
}

export default App;
