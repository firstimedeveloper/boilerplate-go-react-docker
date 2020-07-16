import React from 'react';
import axios from 'axios';
import './FirstimeLang.css';



class TranscriptRow extends React.Component {
    render() {
        const line = this.props.line;
        const end = calculateEndTime(line.tStartMs, line.dDurationMs)
        return (
            <tr>
                <td>{msToTime(line.tStartMs)} - {msToTime(end)}</td>
                <td>{line.segs[0].utf8}</td>
            </tr>
        );
    }
}

class TranscriptTable extends React.Component {
    render() {
        const rows = [];
        this.props.transcript.forEach((line) => {

            rows.push(
                <TranscriptRow 
                    line ={line}
                    key={line.tStartMs}
                />
            )
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Text</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class Search extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <label>
                    Link:
                    <input type="text" onChange={this.props.onChange} />
                </label>
                    <input type="submit" value="Submit" />
            </form>
        );
    }
}

class Lang extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: "http://video.google.com/timedtext?v=dL5oGKNlR6I&lang=de&fmt=json3",
            transcript: sub.events
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    
    // componentDidMount() {
    //     axios.get(`http://localhost:8000/subtitle`)
    //     .then(res => {
    //         console.log(res.data.Transcript)
    //         const transcript = res.data.Transcript;
    //         this.setState({ transcript });
    //     });
    // }
    handleChange(event) {
        this.setState({link: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        e.preventDefault();
        console.log("button clicked");
        axios.get(this.state.link)
        .then(res => {
            console.log(res.data.events)
            const transcript = res.data.events;
            this.setState({ transcript });
        });
    }
    
    render() {
        return (
                <div className="lang">
                    <Search 
                        link = {this.state.link}
                        onSubmit={(e) => this.handleSubmit(e)}
                        onChange={(e) => this.handleChange(e)}
                    />,
                    <TranscriptTable 
                        transcript = {this.state.transcript}
                    />
                </div>
        );
      }
    // axios.get('video.google.com/timedtext?lang=de&v=dL5oGKNlR6I');
}

function msToTime(ms) {   
    var str = ''
    if (ms > 3600000) {
        var hr = Math.floor(ms / 3600000);
        str += hr + ':';
        ms -= (hr * 3600000);
    }
    if (ms > 60000) {
        var min = Math.floor(ms / 60000);
        str += min + ':';
        ms -= (min * 60000);
    }
    str += ms/1000;
    
    return str
}

function calculateEndTime(start, dur) {
    return start + dur
}

const sub = {"events": [ {
    "tStartMs": 1200,
    "dDurationMs": 2040,
    "segs": [ {
      "utf8": "So etwas gab es noch nie."
    } ]
  }, {
    "tStartMs": 5120,
    "dDurationMs": 1880,
    "segs": [ {
      "utf8": "Nicht mal im Guinness-Buch\nder Rekorde."
    } ]
  }, {
    "tStartMs": 7280,
    "dDurationMs": 1920,
    "segs": [ {
      "utf8": "Falls doch,\nschreibts in die Kommentare."
    } ]
  }, {
    "tStartMs": 9960,
    "dDurationMs": 1000,
    "segs": [ {
      "utf8": "- Ahhh Leute!"
    } ]
  }, {
    "tStartMs": 12120,
    "dDurationMs": 2440,
    "segs": [ {
      "utf8": "Heute kommt Meinberg\nan seine Grenzen."
    } ]
  }, {
    "tStartMs": 17800,
    "dDurationMs": 1320,
    "segs": [ {
      "utf8": "Ich bin bereit, für alles."
    } ]
  }, {
    "tStartMs": 20120,
    "dDurationMs": 1120,
    "segs": [ {
      "utf8": "Mein neues Highlight."
    } ]
  }, {
    "tStartMs": 26320,
    "dDurationMs": 1000,
    "segs": [ {
      "utf8": "- Nee."
    } ]
  }, {
    "tStartMs": 27640,
    "dDurationMs": 1160,
    "segs": [ {
      "utf8": "- (lachend) Doch!"
    } ]
  }, {
    "tStartMs": 32760,
    "dDurationMs": 2920,
    "segs": [ {
      "utf8": "Das geht nicht.\nDa löst sich meine Haut ab."
    } ]
  }, {
    "tStartMs": 36320,
    "dDurationMs": 1520,
    "segs": [ {
      "utf8": "Die kann ich hinterher abziehen."
    } ]
  }, {
    "tStartMs": 38160,
    "dDurationMs": 1000,
    "segs": [ {
      "utf8": "Ach nee, ey."
    } ]
  }, {
    "tStartMs": 40760,
    "dDurationMs": 3160,
    "segs": [ {
      "utf8": "Meinberg, ich hab versucht, einen\nArzt erreichen, ging nicht ran."
    } ]
  }, {
    "tStartMs": 454520,
    "dDurationMs": 1040,
    "segs": [ {
      "utf8": "Es wird schon klappen."
    } ]
}]};

export default Lang