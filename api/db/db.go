package db

import (
	"database/sql"
	"fmt"
	"os"
	"reflect"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

func Query(query string, resultType reflect.Type) (interface{}, error) {
	// Load connection string from .env file
	err := godotenv.Load()
	if err != nil {
		return nil, fmt.Errorf("failed to load env: %v", err)
	}

	// Open a connection to db
	db, err := sql.Open("mysql", os.Getenv("DSN"))
	if err != nil {
		return nil, fmt.Errorf("failed to connect: %v", err)
	}
	defer db.Close()

	rows, err := db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("failed to query: %v", err)
	}
	defer rows.Close()

	// Create a new slice of the result type
	results := reflect.MakeSlice(reflect.SliceOf(resultType), 0, 0)

	// Iterate over the rows of the query result
	for rows.Next() {
		// Create a new instance of the result type
		result := reflect.New(resultType).Elem()

		// Get the fields of the result type
		fields := make([]interface{}, resultType.NumField())
		for i := 0; i < resultType.NumField(); i++ {
			fields[i] = result.Field(i).Addr().Interface()
		}

		// Scan the row into the fields of the result type
		if err := rows.Scan(fields...); err != nil {
			return nil, fmt.Errorf("failed to scan row: %v", err)
		}

		// Append the result to the slice
		results = reflect.Append(results, result)
	}

	// Convert the slice to an interface{} and return it
	return results.Interface(), nil
}