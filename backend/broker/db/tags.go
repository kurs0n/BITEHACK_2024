package db

type Tag struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
}

type VolunteerTag struct {
    ID  int    `json:"id"`
    Tag string `json:"tag"`
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

func GetVolunteerTags() ([]VolunteerTag, error) {
    rows, err := DB.Query("SELECT id, tag FROM volunteer_tags")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var volunteerTags []VolunteerTag
    for rows.Next() {
        var volunteerTag VolunteerTag
        if err := rows.Scan(&volunteerTag.ID, &volunteerTag.Tag); err != nil {
            return nil, err
        }
        volunteerTags = append(volunteerTags, volunteerTag)
    }

    if err := rows.Err(); err != nil {
        return nil, err
    }

    return volunteerTags, nil
}