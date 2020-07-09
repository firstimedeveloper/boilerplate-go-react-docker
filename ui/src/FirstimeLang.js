import React from 'react';
import axios from 'axios';
import './FirstimeLang.css';



class TranscriptRow extends React.Component {
    render() {
        const line = this.props.line;
        return (
            <tr>
                <td>{line.start}-{line.end}</td>
                <td>{line.text}</td>
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
                    key={line.start}
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



class Lang extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transcript: sub.Transcript
        };

    }
    
    // componentDidMount() {
    //     axios.get(`http://localhost:8000/subtitle`)
    //     .then(res => {
    //         console.log(res.data.Transcript)
    //         const transcript = res.data.Transcript;
    //         this.setState({ transcript });
    //     });
    // }
    
      render() {
        return (
                <div class="lang">
                    <TranscriptTable 
                        transcript = {this.state.transcript}
                    />
                </div>
        );
      }
    // axios.get('video.google.com/timedtext?lang=de&v=dL5oGKNlR6I');
}

const sub = {"Transcript":[{"text":"So etwas gab es noch nie.","start":"1.2","Dur":"2.04","end":"3.24"},{"text":"Nicht mal im Guinness-Buch der Rekorde.","start":"5.12","Dur":"1.88","end":"7.00"},{"text":"Falls doch, schreibts in die Kommentare.","start":"7.28","Dur":"1.92","end":"9.20"},{"text":"- Ahhh Leute!","start":"9.96","Dur":"1","end":"10.96"},{"text":"Heute kommt Meinberg an seine Grenzen.","start":"12.12","Dur":"2.44","end":"14.56"},{"text":"Ich bin bereit, für alles.","start":"17.8","Dur":"1.32","end":"19.12"},{"text":"Mein neues Highlight.","start":"20.12","Dur":"1.12","end":"21.24"},{"text":"- Nee.","start":"26.32","Dur":"1","end":"27.32"},{"text":"- (lachend) Doch!","start":"27.64","Dur":"1.16","end":"28.80"},{"text":"Das geht nicht. Da löst sich meine Haut ab.","start":"32.76","Dur":"2.92","end":"35.68"},{"text":"Die kann ich hinterher abziehen.","start":"36.32","Dur":"1.52","end":"37.84"},{"text":"Ach nee, ey.","start":"38.16","Dur":"1","end":"39.16"},{"text":"Meinberg, ich hab versucht, einen Arzt erreichen, ging nicht ran.","start":"40.76","Dur":"3.16","end":"43.92"},{"text":"Es wird schon klappen.","start":"45.52","Dur":"1.04","end":"46.56"},{"text":"* Musik: George Michael - Careless Whisper *","start":"48.24","Dur":"3.76","end":"52.00"},{"text":"Auf die Plätze, fertig, los.","start":"55.24","Dur":"1.8","end":"57.04"},{"text":"- Das Problem ist, jetzt erst mal fühlt sich das Mega angenehm an.","start":"61.96","Dur":"4","end":"65.96"},{"text":"- Aber du hast ja nur noch 23 Stunden, 59 Minuten und 45 Sekunden.","start":"67.92","Dur":"4.96","end":"72.88"},{"text":"Dort ist ne Kamera, die läuft durch. 24 Stunden.","start":"76.48","Dur":"3.2","end":"79.68"},{"text":"Auch wenn ich im Nachhinein sehe, dass sie den Pool verlassen hast,","start":"80.68","Dur":"2.96","end":"83.64"},{"text":"verlierst du.","start":"83.72","Dur":"0.88","end":"84.60"},{"text":"- Ich darf gar nicht raus?","start":"85.4","Dur":"2.6","end":"88.00"},{"text":"- Auf den Moment habe ich mich so gefreut,","start":"88.6","Dur":"1.84","end":"90.44"}]};

export default Lang