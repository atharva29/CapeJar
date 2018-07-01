// package main

// import (
// 	"encoding/json"
// 	"fmt"
// 	"log"
// 	"net/http"
// 	"runtime"

// 	"github.com/gorilla/mux"
// 	"github.com/gorilla/websocket"
// )

// type data struct {
// 	Lat     float32 `json:""`
// 	Lnd     float32 `json:""`
// 	Color   int     `json:""`
// 	Message string  `json:""`
// }

// var num float32
// var upgrader = websocket.Upgrader{}
// var giveTtnData = make(chan *data)
// var closeWebSocket = make(chan int)

// func writeJSONtoClient(conn *websocket.Conn) {
// 	fmt.Println(runtime.NumGoroutine())
// 	select {
// 	case t := <-giveTtnData:
// 		{
// 			conn.WriteJSON(data{
// 				Lat:     t.Lat,
// 				Lnd:     t.Lnd,
// 				Color:   t.Color,
// 				Message: "Name : Churchgate",
// 			})
// 			fmt.Println("Sent")
// 		}
// 	case <-closeWebSocket:
// 		{
// 			fmt.Println("Closing Write Connection")
// 			return
// 		}
// 	}
// }

// func readWebsocket(conn *websocket.Conn) {
// 	_, _, err := conn.ReadMessage()
// 	if err != nil {
// 		//fmt.Println("Closed Websocket")
// 		closeWebSocket <- 1
// 		return
// 	}
// }

// func handler(w http.ResponseWriter, r *http.Request) {
// 	conn, err := upgrader.Upgrade(w, r, nil)
// 	if err != nil {
// 		log.Fatal("Upgrading To Websocket Error : ", err)
// 		return
// 	}
// 	go readWebsocket(conn)
// 	// write with connection
// 	go writeJSONtoClient(conn)
// }

// func simpleHandler(w http.ResponseWriter, r *http.Request) {
// 	http.ServeFile(w, r, "Map.html")
// }

// func parseGhPost(rw http.ResponseWriter, request *http.Request) {
// 	fmt.Println(runtime.NumGoroutine())
// 	decoder := json.NewDecoder(request.Body)
// 	var t data
// 	err := decoder.Decode(&t)
// 	if err != nil {
// 		panic(err)
// 	}
// 	fmt.Println(t.Lat)
// 	giveTtnData <- &t
// }

// func main() {
// 	router := mux.NewRouter()
// 	router.HandleFunc("/", simpleHandler)
// 	router.HandleFunc("/coehttpintegration", parseGhPost)
// 	router.HandleFunc("/ws", handler)
// 	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./")))
// 	// err := http.ListenAndServe(":"+os.Getenv("PORT"), router)
// 	// if err != nil {
// 	// 	panic(err)
// 	// }
// 	http.ListenAndServe(":8500", router)
// }
