package main

import (
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

// we can omit  the varible insided it
type data struct {
	Lat   float32 `json:""`
	Lng   float32 `json:""`
	Color int     `json:""`
}

var upgrader = websocket.Upgrader{}

func handler(w http.ResponseWriter, r *http.Request) {
	conn, _ := upgrader.Upgrade(w, r, nil)
	go func(conn *websocket.Conn) {
		ch := time.Tick(5 * time.Second)
		for range ch {
			conn.WriteJSON(data{
				// Lat:    19.0274,
				// Lng:    72.856689,
				Lat:   18.9322,
				Lng:   72.8264,
				Color: 0,
			})
		}
	}(conn)
}

func simpleHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "index.html")
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/", simpleHandler)
	router.HandleFunc("/ws1", handler)
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("E:/startbootstrap-sb-admin-master")))
	http.ListenAndServe(":3000", router)
}
