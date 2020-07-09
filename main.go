package main

import (
	"encoding/json"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/gorilla/mux"
	"github.com/pkg/errors"
)

// spaHandler implements the http.Handler interface, so we can use it
// to respond to HTTP requests. The path to the static directory and
// path to the index file within that static directory are used to
// serve the SPA in the given static directory.
type spaHandler struct {
	staticPath string
	indexPath  string
}

// ServeHTTP inspects the URL path to locate a file within the static dir
// on the SPA handler. If a file is found, it will be served. If not, the
// file located at the index path on the SPA handler will be served. This
// is suitable behavior for serving an SPA (single page application).
func (h spaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// get the absolute path to prevent directory traversal
	path, err := filepath.Abs(r.URL.Path)
	if err != nil {
		// if we failed to get the absolute path respond with a 400 bad request
		// and stop
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// prepend the path with the path to the static directory
	path = filepath.Join(h.staticPath, path)

	// check whether a file exists at the given path
	_, err = os.Stat(path)
	if os.IsNotExist(err) {
		// file does not exist, serve index.html
		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
		return
	} else if err != nil {
		// if we got an error (that wasn't that the file doesn't exist) stating the
		// file, return a 500 internal server error and stop
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// otherwise, use http.FileServer to serve the static dir
	http.FileServer(http.Dir(h.staticPath)).ServeHTTP(w, r)
}

type Line struct {
	Text  string `xml:",chardata" json:"text"`
	Start string `xml:"start,attr" json:"start"`
	Dur   string `xml:"dur,attr"`
	End   string `xml:"-" json:"end"`
}

type Transcript struct {
	Lines []Line `xml:"text" json:"Transcript"`
}

func (t *Transcript) parseSubtitles(link string) error {
	resp, err := http.Get(link)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		return errors.Errorf("Response status: %s", resp.Status)
	}

	subXML, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	subXML = []byte(strings.ReplaceAll(string(subXML), "\n", " "))

	var sub Transcript
	if err := xml.Unmarshal(subXML, &sub); err != nil {
		return err
	}
	t.Lines = sub.Lines
	for i := range t.Lines {
		tempStart, err := strconv.ParseFloat(t.Lines[i].Start, 64)
		if err != nil {
			return errors.Errorf("Unable to parse tempStart: %v", err)
		}
		tempDur, err := strconv.ParseFloat(t.Lines[i].Dur, 64)
		if err != nil {
			return errors.Errorf("Unable to parse tempStart: %v", err)
		}

		num := tempStart + tempDur
		t.Lines[i].End = strconv.FormatFloat(num, 'f', 2, 64)
	}
	return nil
}

func showTranscript(w http.ResponseWriter, r *http.Request) {
	var transcript Transcript
	err := transcript.parseSubtitles("https://video.google.com/timedtext?lang=de&v=dL5oGKNlR6I")
	if err != nil {
		fmt.Println("unable to parse subtitles: ", err)
	}
	output, err := json.Marshal(transcript)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(output)
}

// Message struct for json that has a text
type Message struct {
	Text string `json:"text"`
}

func showMessage(w http.ResponseWriter, r *http.Request) {
	message := Message{"Jun"}

	output, err := json.Marshal(message)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(output)
}

func contact(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "contact us page")
}

func about(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "about us page")
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/about-us", about)
	router.HandleFunc("/contact-us", contact)
	router.HandleFunc("/hello", showMessage)
	router.HandleFunc("/subtitle", showTranscript)
	router.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		// an example API handler
		json.NewEncoder(w).Encode(map[string]bool{"ok": true})
	})

	spa := spaHandler{staticPath: "ui/build", indexPath: "index.html"}
	router.PathPrefix("/").Handler(spa)

	srv := &http.Server{
		Handler: router,
		Addr:    ":8000",
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	fmt.Println("Listening on port ", srv.Addr)
	log.Fatal(srv.ListenAndServe())
}
