import { useState } from 'react';
import { Checkbox, FormControl, ListItemText, MenuItem, Select, TextField } from '@mui/material';

export default function MultipleSelectCheckmarks({ data, value, onChange, links, onChangeLinks }) {
  const [personName, setPersonName] = useState(value || {});

  const handleChange = (event) => {
    const { value } = event.target;
    setPersonName(value);
    onChange(value); 
  };

  const handleLinkChange = (name, link) => {
    onChangeLinks({ ...links, [name]: link });
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 504 }}>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {data.map((item) => (
            <MenuItem key={item.id} value={item.name}>
              <Checkbox checked={personName.indexOf(item.name) > -1} />
              <ListItemText primary={item.name} />
              {personName.indexOf(item.name) > -1 && (
                <TextField
                  label="Ссылка"
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleLinkChange(item.name, e.target.value)}
                  value={links[item.name] || ''}
                />
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}