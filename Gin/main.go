package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/go-sql-driver/mysql"
)

var db *sql.DB

// Struct tags such as json:"artist" specify what a field’s name should be
// when the struct’s contents are serialized into JSON.
// Without them, the JSON would use the struct’s capitalized field names
type Car struct {
	ID             int64
	Model          string  `json:"model"`
	Year           int     `json:"year"`
	Manufacturer   string  `json:"manufacturer"`
	EngineCapacity float64 `json:"engine_capacity"`
}

func getAllCars(c *gin.Context) {
	// https://go.dev/doc/tutorial/web-service-gin#write-the-code-1
	// https://go.dev/doc/tutorial/database-access#write-the-code-1
	var cars []Car
	rows, err := db.Query("SELECT * FROM car")
	if err != nil {
		fmt.Errorf("Error: %q", err)
		c.Status(http.StatusFailedDependency)
	}
	defer rows.Close()
	for rows.Next() {
		var car Car
		if err := rows.Scan(&car.ID, &car.Model, &car.Year, &car.Manufacturer, &car.EngineCapacity); err != nil {
			fmt.Errorf("Error: %q", err)
			c.Status(http.StatusFailedDependency)
		}
		cars = append(cars, car)
	}
	if err := rows.Err(); err != nil {
		c.Status(http.StatusFailedDependency)
	}
	c.IndentedJSON(http.StatusOK, cars)
}

func getCarById(c *gin.Context) {
	id := c.Param("id")
	var car Car

	row := db.QueryRow("SELECT * FROM car WHERE id = ?", id)
	if err := row.Scan(&car.ID, &car.Model, &car.Year, &car.Manufacturer, &car.EngineCapacity); err != nil {
		if err == sql.ErrNoRows {
			fmt.Errorf("SQL Error: %q", err)
			c.Status(http.StatusFailedDependency)
		}
		fmt.Errorf("Error: %q", err)
		c.Status(http.StatusFailedDependency)
	}
	c.IndentedJSON(http.StatusOK, car)
}

func postNewCar(c *gin.Context) {
	var newCar Car

	// Call BindJSON to bind the received JSON to newCar
	if err := c.BindJSON(&newCar); err != nil {
		fmt.Errorf("SQL Error: %q", err)
		c.Status(http.StatusFailedDependency)
	}

	// Add the new album to the table
	result, err := db.Exec("INSERT INTO car (model, year, manufacturer, engineCapacity) VALUES (?, ?, ?, ?)", newCar.Model, newCar.Year, newCar.Manufacturer, newCar.EngineCapacity)
	if err != nil {
		fmt.Errorf("SQL Error: %q", err)
		c.Status(http.StatusFailedDependency)
	}

	id, err := result.LastInsertId()
	if err != nil {
		fmt.Errorf("SQL Error: %q", err)
		c.Status(http.StatusFailedDependency)
	}
	c.IndentedJSON(http.StatusCreated, id)

}

// to run this app: $ go run .
func main() {
	// https://go.dev/doc/tutorial/database-access#get_handle
	// Capture connection properties.
	// from the terminal, set user and pwd
	// $ export DBUSER=root
	// $ export DBPASS=filippo333
	cfg := mysql.Config{
		User:   os.Getenv("DBUSER"), // localhost
		Passwd: os.Getenv("DBPASS"), // filippo333
		Net:    "tcp",
		Addr:   "127.0.0.1:3306",
		DBName: "vehicles",
	}
	// Get a database handle
	var err error
	db, err = sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}

	pingErr := db.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
	}

	fmt.Println("DB: connected.")

	router := gin.Default()
	router.GET("/cars", getAllCars)    // curl http://localhost:8080/cars
	router.GET("/car/:id", getCarById) // curl http://localhost:8080/car/:id
	router.POST("/car", postNewCar)
	// curl http://localhost:8080/car \
	// --include \
	// --header "Content-Type: application/json" \
	// --request "POST" \
	// --data '{"model":"500","year": 1972,"manufacturer":"Fiat","engineCapacity":0.5}'

	router.Run("localhost:8080")
}
