import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function MultipleSelectCheckmarks({ data }) {
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [linkInputs, setLinkInputs] = React.useState({});

  const handleOptionChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  const handleLinkChange = (id) => (event) => {
    setLinkInputs({ ...linkInputs, [id]: event.target.value });
  };

  const handleAddLinkClick = (id) => {
    setLinkInputs({ ...linkInputs, [id]: '' });
  };

  const handleLinkClick = (event) => {
    event.stopPropagation(); // Предотвращаем всплытие события клика
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">{data.name}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedOptions}
          onChange={handleOptionChange}
          input={<OutlinedInput label={data.name} />}
          renderValue={(selected) => selected.join(', ')}
        >
          {data.researchActivitiesSubtitles.map((item) => (
            <MenuItem key={item.id} value={item.name}>
              <Checkbox checked={selectedOptions.indexOf(item.name) > -1} />
              <ListItemText primary={item.name} />
              {selectedOptions.includes(item.name) && (
                <div>
                  <TextField
                    id={`link-input-${item.id}`}
                    label={`${item.name}`}
                    value={linkInputs[`link-input-${item.id}`] || ''}
                    onChange={handleLinkChange(`link-input-${item.id}`)}
                    onClick={handleLinkClick}
                    margin="normal"
                    variant="outlined"
                  />
                  <Button
                    onClick={(e) => {
                      handleAddLinkClick(`link-input-${item.id}`);
                      e.stopPropagation();
                    }}
                    variant="outlined"
                    size="small"
                    sx={{ marginLeft: '10px' }}
                  >
                    Добавить
                  </Button>
                </div>
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}