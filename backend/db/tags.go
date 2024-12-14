package db

type Tag struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
}

func GetTags() ([]Tag, error) {
    rows, err := DB.Query("SELECT id, name FROM tags")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var tags []Tag
    for rows.Next() {
        var tag Tag
        if err := rows.Scan(&tag.ID, &tag.Name); err != nil {
            return nil, err
        }
        tags = append(tags, tag)
    }

    if err := rows.Err(); err != nil {
        return nil, err
    }

    return tags, nil
}