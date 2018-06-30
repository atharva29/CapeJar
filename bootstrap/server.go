package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

type data struct {
	Lat     float32 `json:""`
	Lnd     float32 `json:""`
	Color   int     `json:""`
	Message string  `json:""`
}

var num float32
var upgrader = websocket.Upgrader{}
var giveTtnData = make(chan interface{})

func writeJSONtoClient(conn *websocket.Conn) {

	//ch := time.Tick(5 * time.Second)
	//for range ch {
	err := conn.SetWriteDeadline(time.Now().Add(5 * time.Second))
	conn.WriteJSON(data{
		Lat:     18.9322,
		Lnd:     72.8264,
		Color:   1,
		Message: "Name : Churchgate",
	})
	if err != nil {
		log.Println("Error Writing", err)
		return
	}
	//}
}

func handler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal("Upgrading To Websocket Error : ", err)
		return
	}
	// write with connection
	go writeJSONtoClient(conn)
}

func simpleHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "Map.html")
}

func parseGhPost(rw http.ResponseWriter, request *http.Request) {
	decoder := json.NewDecoder(request.Body)

	var t data
	err := decoder.Decode(&t)

	if err != nil {
		panic(err)
	}
	giveTtnData <- t
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/", simpleHandler)
	router.HandleFunc("/coehttpintegration", parseGhPost)
	router.HandleFunc("/ws", handler)
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./")))
	err := http.ListenAndServe(":"+os.Getenv("PORT"), router)
	if err != nil {
		panic(err)
	}
}
