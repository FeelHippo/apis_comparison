package controllers

import (
	"encoding/json"
	"context"
	"io/ioutil"
	"log"
	"time"
	"net/http"
	"os"

	"go.mongodb.org/mongo-driver/bson"
  "go.mongodb.org/mongo-driver/mongo"
  "go.mongodb.org/mongo-driver/mongo/options"
)

type BullshitJSON struct {
	Bullshit string
}

func GetBullshit(w http.ResponseWriter, r *http.Request) {
	response, err := http.Get("https://corporatebs-generator.sameerkumar.website/")
	if err != nil {
		log.Fatalln(err)
	}
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatalln(err)
	}
	stringified := string(body)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(stringified))
}

func PostBullshit(w http.ResponseWriter, r *http.Request) {
	// get working dir path
	path, err := os.Getwd()
	if err != nil {
		log.Fatalln(err)
		w.WriteHeader(http.StatusInternalServerError)
	}
	// read request body
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatalln(err)
		w.WriteHeader(http.StatusTeapot)
	}
	// parse body to string
	stringified := string(body)
	// write to file
	ioutil.WriteFile(path+"/temp.txt", []byte(stringified), 0)

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(stringified))
}

func PostBullcrap(w http.ResponseWriter, r *http.Request) {
	// read request body
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatalln(err)
		w.WriteHeader(http.StatusTeapot)
	}
	var data BullshitJSON
	err = json.Unmarshal(body, &data)
	if err != nil {
		log.Fatalln(err)
		w.WriteHeader(http.StatusTeapot)
	}
	// define handle to collection
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatalln(err)
		w.WriteHeader(http.StatusTeapot)
	}
	mongoContext, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(mongoContext)
	if err != nil {
		log.Fatalln(err)
		w.WriteHeader(http.StatusTeapot)
	}
	defer client.Disconnect(mongoContext)

	testTable := client.Database("test")
	testCollection := testTable.Collection("go")

	result, err := testCollection.UpdateOne(
			mongoContext,
			bson.M{ "bullshit": data.Bullshit },
			bson.D{{ "$set", bson.D{{ "bullshit", data.Bullshit }} }},
			options.Update().SetUpsert(true),
		)
	if err != nil {
		log.Fatalln(err)
		w.WriteHeader(http.StatusTeapot)
	}

	stringified := string(result.ModifiedCount)
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(stringified))
}

func PutBullshit(w http.ResponseWriter, r *http.Request) {
	// read request body
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatalln(err)
		w.WriteHeader(http.StatusTeapot)
	}
	var data BullshitJSON
	err = json.Unmarshal(body, &data)
	if err != nil {
		log.Fatalln(err)
		w.WriteHeader(http.StatusTeapot)
	}
	// define handle to collection
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatalln(err)
		w.WriteHeader(http.StatusTeapot)
	}
	mongoContext, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(mongoContext)
	if err != nil {
		log.Fatalln(err)
		w.WriteHeader(http.StatusTeapot)
	}
	defer client.Disconnect(mongoContext)

	testTable := client.Database("test")
	testCollection := testTable.Collection("go")

	result, err := testCollection.UpdateOne(
			mongoContext,
			bson.M{ "bullshit": data.Bullshit },
			bson.D{{ "$set", bson.D{{ "bullshit", data.Bullshit + " updated" }} }},
			options.Update().SetUpsert(true),
		)
	if err != nil {
		log.Fatalln(err)
		w.WriteHeader(http.StatusTeapot)
	}

	stringified := string(result.ModifiedCount)
	w.WriteHeader(http.StatusNoContent)
	w.Write([]byte(stringified))
}

func DeleteBullshit(w http.ResponseWriter, r *http.Request) {
	message := r.URL.Query().Get("message")
	// define handle to collection
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatalln(err)
		w.WriteHeader(http.StatusTeapot)
	}
	mongoContext, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(mongoContext)
	if err != nil {
		log.Fatalln(err)
		w.WriteHeader(http.StatusTeapot)
	}
	defer client.Disconnect(mongoContext)

	testTable := client.Database("test")
	testCollection := testTable.Collection("go")

	result, err := testCollection.DeleteOne(
			mongoContext,
			bson.M{ "bullshit": message },
		)
	if err != nil {
		log.Fatalln(err)
		w.WriteHeader(http.StatusTeapot)
	}

	stringified := string(result.DeletedCount)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(stringified))
}
