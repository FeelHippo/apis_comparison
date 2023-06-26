package main

import (
	"Golang/utils"
	"log"
	"net/http"
)

func home(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	switch r.Method {
	case "GET":
		controllers.GetBullshit(w, r)
	case "POST":
		if r.URL.String() == "/file" {
			controllers.PostBullshit(w, r)
		} else if r.URL.String() == "/db" {
			controllers.PostBullcrap(w, r)
		} else {
			http.Error(w, "bad_request", http.StatusTeapot)
			return
		}
	case "PUT":
		controllers.PutBullshit(w, r)
	case "DELETE":
		controllers.DeleteBullshit(w, r)
	default:
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(`{"message": "Hello Filippo Default"}`))
	}
}

func main() {
	http.HandleFunc("/", home)
	log.Fatal(http.ListenAndServe(":3001", nil))
}
