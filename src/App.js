import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';



class App extends Component {

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.formStyle = {
            "maxWidth" : "600px"
        }

        this.qrCodeBase = "http://api.qrserver.com/v1/create-qr-code/?data=";
        this.qrCodeEnding = "&size=200x200";
        this.qrCodeColor = "&color=";
        this.qrCodeBgColor = "&bgcolor=";
        this.wordInput = "";
        this.colourMapper = {
            "White" : "FFFFFF",
            "Black" : "000000",
            "Red" : "B22222",
            "Green" :"7CFC00",
            "Blue" : "327ffc"
        }
        this.emptyStyle = {
            "minHeight" : "220px",
            "minWidth"  : "220px",
            "maxWidth"  : "220px",
            "maxHeight" : "220px"
        }

        this.state = {
            "qrCodeLink": "initial",
            "qrCodeColour" : "000000",
            "qrCodeBgColour" : "FFFFFF",
            "selectedFile" : "Choose File"
        };
    }


    renderImage(link, codeColor, bgColour) {
        if (link === "initial") {
            return (
                <div className="border border-secondary m-1" style={this.emptyStyle}>
                </div>
            );
        }
        return (
            <img src={this.qrCodeBase + link + this.qrCodeEnding + this.qrCodeColor + codeColor + this.qrCodeBgColor + bgColour}alt="logo" />
        );
        // <img src={this.qrCodeBase + link + this.qrCodeEnding} className="App-logo" alt="logo" />
    }

    createQRimage(word) {
        console.log(document.getElementById("fileSelector").value);
        if (word !== "") {
            this.setState({qrCodeLink: this.wordInput.value});
            this.setState({qrCodeColour: this.colourMapper[document.getElementById("codeColourSelector").value]});
            this.setState({qrCodeBgColour: this.colourMapper[document.getElementById("backgroundColourSelector").value]});
            document.getElementById('wordForm').value = "";

        } else {
            alert("Input Can Not Be Empty");
        }
    }

    componentDidMount() {
        let self = this;
        document.getElementById('fileSelector').onchange = function() {
            let uploadedFileName = document.getElementById("fileSelector").value;
            if (uploadedFileName === "") {
                self.setState({selectedFile: "Choose File"});
            } else {
                var filename = uploadedFileName.replace(/^.*\\/, "");
                self.setState({selectedFile: filename});
            }
        };
    }



    render() {

        return (

            <div className="App">
                <h1><span className="badge badge-primary">Smart QR Code Creator/Reader</span></h1>
                <div className="container">
                    <div className="row">
                        <div className="col-sm m-2 p-2">

                            <div className="form-group">
                                <label htmlFor="codeColourSelector">Select Code Color:</label>
                                <select className="form-control" id="codeColourSelector">
                                    <option>Black</option>
                                    <option>White</option>
                                    <option>Red</option>
                                    <option>Green</option>
                                    <option>Blue</option>
                                </select>
                            </div>

                        </div>
                        <div className="col-sm m-2 p-2">

                            <div className="form-group">
                                <label htmlFor="backgroundColourSelector">Select Background Color:</label>
                                <select className="form-control" id="backgroundColourSelector">
                                    <option>White</option>
                                    <option>Black</option>
                                    <option>Red</option>
                                    <option>Green</option>
                                    <option>Blue</option>
                                </select>
                            </div>

                        </div>
                        <div className="col-sm">
                            <div className="form-group m-2 p-2" style={this.formStyle} >
                                <label>Name To Create QR : </label>
                                <input type="word" className="form-control" id="wordForm" ref={input => this.wordInput = input} placeholder="Word..."/>
                                <button type="button" className="btn btn-primary btn-lg m-2" onClick={() => this.createQRimage(this.wordInput.value)}>Create QR</button>
                            </div>
                        </div>
                        <div className="col-sm m-2 p-2">
                            {this.renderImage(this.state.qrCodeLink, this.state.qrCodeColour, this.state.qrCodeBgColour)}
                        </div>
                    </div>
                </div>


                <div>
                    <form encType="multipart/form-data" action="http://api.qrserver.com/v1/read-qr-code/" method="POST">
                        <input type="hidden" name="MAX_FILE_SIZE" value="1048576" />
                        <label>Choose QR code image to read : </label><br/>
                        <label className="btn btn-outline-primary m-2">
                            {this.state.selectedFile} <input id="fileSelector" name="file" type="file" hidden/>
                        </label>
                        <button type="submit" className="btn btn-primary m-2">Read QR Code</button>
                    </form>
                </div>

            </div>

        );
    }
}

export default App;






















//
