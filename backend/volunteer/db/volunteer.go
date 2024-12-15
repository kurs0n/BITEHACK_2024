package db

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"strings"
)


type Volunteer struct {
    ID              int      `json:"id"`
    Name            string   `json:"name"`
    Surname         string   `json:"surname"`
    Email           string   `json:"email"`
    TelephoneNumber string   `json:"telephone_number"`
    Photo           string   `json:"photo"`
    Tags            []string `json:"tags"`
    Voivodeship     string   `json:"voivodeship"`
}

func GetVolunteerById(ctx context.Context, id int) (*Volunteer, error) {
    var vol Volunteer
    var tags string

    query := "SELECT id, name, surname, email, telephone_number, photo, tags, voivodeship FROM volunteers WHERE id = ?"
    err := DB.QueryRowContext(ctx, query, id).Scan(
        &vol.ID, &vol.Name, &vol.Surname, &vol.Email, &vol.TelephoneNumber, &vol.Photo, &tags, &vol.Voivodeship)
    if err != nil {
        if err == sql.ErrNoRows {
            return nil, fmt.Errorf("volunteer with id %d not found", id)
        }
        return nil, err
    }

    // Unmarshal the JSON tags into the Tags field
    if err := json.Unmarshal([]byte(tags), &vol.Tags); err != nil {
        return nil, err
    }

    return &vol, nil
}

func ListVolunteers(ctx context.Context, tags []string, voivodeship string) ([]Volunteer, error) {
    query := "SELECT id, name, surname, email, telephone_number, photo, tags, voivodeship FROM volunteers WHERE voivodeship LIKE ?"
    args := []interface{}{"%" + voivodeship + "%"}

    if len(tags) > 0 {
        tagConditions := make([]string, len(tags))
        for i, tag := range tags {
            tagConditions[i] = "JSON_CONTAINS(tags, ?)"
            args = append(args, fmt.Sprintf(`"%s"`, tag))
        }
        query += " AND (" + strings.Join(tagConditions, " OR ") + ")"
    }

    rows, err := DB.QueryContext(ctx, query, args...)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var volunteers []Volunteer
    for rows.Next() {
        var vol Volunteer
        var tags string
        if err := rows.Scan(&vol.ID, &vol.Name, &vol.Surname, &vol.Email, &vol.TelephoneNumber, &vol.Photo, &tags, &vol.Voivodeship); err != nil {
            return nil, err
        }
        if err := json.Unmarshal([]byte(tags), &vol.Tags); err != nil {
            return nil, err
        }
        volunteers = append(volunteers, vol)
    }

    if err := rows.Err(); err != nil {
        return nil, err
    }

    return volunteers, nil
}

func CreateVolunteer(ctx context.Context, vol *Volunteer) (*Volunteer, error) {
    tags, err := json.Marshal(vol.Tags)
    if err != nil {
        return nil, err
    }

    query := "INSERT INTO volunteers (name, surname, email, telephone_number, photo, tags, voivodeship) VALUES (?, ?, ?, ?, ?, ?, ?)"
    result, err := DB.ExecContext(ctx, query, vol.Name, vol.Surname, vol.Email, vol.TelephoneNumber, vol.Photo, tags, vol.Voivodeship)
    if err != nil {
        return nil, err
    }

    id, err := result.LastInsertId()
    if err != nil {
        return nil, err
    }
    vol.ID = int(id)

    return vol, nil
}