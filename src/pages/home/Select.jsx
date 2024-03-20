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

  const handleLinkChange = (optionId, index) => (event) => {
    const newLinks = { ...linkInputs };
    newLinks[optionId][index] = { link: event.target.value };
    setLinkInputs(newLinks);
  };

  const handleAddLinkClick = (optionId) => {
    setLinkInputs({
      ...linkInputs,
      [optionId]: [...(linkInputs[optionId] || []), { link: '' }],
    });
  };

  const handleLinkClick = (event) => {
    event.stopPropagation();
  };

  const renderLinksForOption = (option) => {
    const optionId = option.id;
    return selectedOptions.includes(option.name) && (
      <div key={optionId} className='input__links'>
        {linkInputs[optionId]?.map((linkData, index) => (
          <div key={`link-input-${optionId}-${index}`}>
            <TextField
              id={`link-input-${optionId}-${index}`}
              label={`${option.name}`}
              value={linkData.link}
              onChange={handleLinkChange(optionId, index)}
              onClick={handleLinkClick}
              margin="normal"
              variant="outlined"
            />
          </div>
        ))}
        <Button
          onClick={(event) => {
            event.stopPropagation();
            handleAddLinkClick(optionId);
          }}
          variant="outlined"
          size="small"
          sx={{ marginLeft: '10px' }}
        >
          Добавить
        </Button>
      </div>
    );
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
              {renderLinksForOption(item)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}