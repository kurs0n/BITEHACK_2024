package db

type Icon struct {
    IconPath    string `json:"icon_path"`
    Description string `json:"description"`
}

func GetIconsByTag(tag string) ([]Icon, error) {
    rows, err := DB.Query("SELECT icon_path, description FROM icons WHERE tag = ?", tag)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var icons []Icon
    for rows.Next() {
        var icon Icon
        if err := rows.Scan(&icon.IconPath, &icon.Description); err != nil {
            return nil, err
        }
        icons = append(icons, icon)
    }

    if err := rows.Err(); err != nil {
        return nil, err
    }

    return icons, nil
}