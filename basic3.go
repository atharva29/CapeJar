package main

import (
	"fmt"
	"net/http"
	"runtime"
	"time"
		"log"
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
	num := runtime.NumGoroutine()
	fmt.Println(num)
	//defer conn.Close()
		ch := time.Tick(5 * time.Second)
		for range ch {
			conn.SetWriteDeadline(time.Now().Add(5 * time.Second))
			err := conn.WriteJSON(data{
				// Lat:    19.0274,
				// Lng:    72.856689,
				Lat:   19.022,
				Lng:   72.856689,
				Color: 0,
			})
			if err != nil {
				log.Println("Error Writing",err)
				return
			}
		}
}

func simpleHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "tables.html")
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/", simpleHandler)
	router.HandleFunc("/ws1", handler)
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("/home/vjti/website/startbootstrap-sb-admin-gh-pages")))
	http.ListenAndServe(":3000", router)
}
