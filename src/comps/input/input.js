import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';  // Importing eye icons from react-icons
import { TextField, FormHelperText,MenuItem } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

const Input = ({ placeholder, type, value, isRequired, onChange, labelName, helperText, inputProps }) => {
  return (
    <>
      <TextField
        className="bg-white rounded-lg"
        variant="outlined"
        type={type}
        helperText={helperText &&
          <FormHelperText sx={{ color: '#492533' }}>
            {helperText}
          </FormHelperText>
        }
        placeholder={placeholder}
        label={labelName}
        required={isRequired}
        value={value}
        onChange={onChange}
        InputProps={inputProps}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#492533', // Background color
            color: '#F0D0A6', // Text color
            '& fieldset': {
              borderColor: '#FEF5EC', // Default white border color
            },
            '&:hover fieldset': {
              borderColor: '#FEF5EC', // Keep white border on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FEF5EC', // Border color on focus
            },
          },
          '& .MuiInputBase-input': {
            color: '#FEF5EC', // Input text color
          },
          '& .MuiInputLabel-root': {
            color: '#FEF5EC',// Label color
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#FEF5EC', // Focused label color
          },
        }}>
      </TextField>
    </>
  )
};

const PasswordInput = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Input
        labelName="Password"
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        inputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={togglePasswordVisibility}
                sx={{
                  color: '#F0D0A6',
                  '&:hover': {
                    color: 'white',
                    backgroundColor: '#492533',
                    transition: 'all 0.3s ease',
                  },
                }}
                edge="end"
              >
                {showPassword ? <AiOutlineEyeInvisible color="white" size={20} /> : <AiOutlineEye color="white" size={20} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  )
}

const SelectInput = ({ placeholder, labelName, isRequired, value, onChange, selectVals, helperText, fullWidth, defaultValue }) => {
  return (<>
    <TextField
      className="bg-white rounded-lg"
      variant="outlined"
      select
      fullWidth
      helperText={helperText &&
        <FormHelperText sx={{ color: '#492533' }}>
          {helperText}
        </FormHelperText>
      }
      placeholder={placeholder}
      label={labelName}
      required={isRequired}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#492533', // Background color
          color: '#F0D0A6', // Text color
          '& fieldset': {
            borderColor: '#FEF5EC', // Default white border color
          },
          '&:hover fieldset': {
            borderColor: '#FEF5EC', // Keep white border on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: '#FEF5EC', // Border color on focus
          },
        },
        "& .MuiSelect-icon": {
          color: "#FEF5EC", // Set the arrow color here
        },
        "& .MuiDate-icon": {
          color: "#FEF5EC", // Set the arrow color here
        },
        "& .MuiTime-icon": {
          color: "#FEF5EC", // Set the arrow color here
        },
        '& .MuiInputBase-input': {
          color: '#FEF5EC', // Input text color
        },
        '& .MuiInputLabel-root': {
          color: '#FEF5EC',// Label color
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#FEF5EC', // Focused label color
        },
      }}>
      {selectVals && selectVals.map((option) => (
        <MenuItem key={option.value} value={option.value}
        sx={{
          backgroundColor: '#492533', // Background color for menu item
          color: '#FEF5EC', // Text color for menu item
          '&:hover': {
            backgroundColor: '#F0D0A6', // Hover background color
            color: '#492533', // Hover text color
          },
          '&.Mui-selected': {
            backgroundColor: '#F0D0A6', // Hover background color
            color: '#492533', // Hover text color
          },
        }}
        >
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  </>
  )

}


const InputArea = ({ placeholder,  value, isRequired, onChange, labelName, helperText, rows }) => {
  return (
    <>
      <TextField
        className="bg-white rounded-lg"
        variant="outlined"
        multiline
        helperText={helperText &&
          <FormHelperText sx={{ color: '#492533' }}>
            {helperText}
          </FormHelperText>
        }
        placeholder={placeholder}
        label={labelName}
        required={isRequired}
        value={value}
        onChange={onChange}
        rows={rows}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#492533', // Background color
            color: '#F0D0A6', // Text color
            '& fieldset': {
              borderColor: '#FEF5EC', // Default white border color
            },
            '&:hover fieldset': {
              borderColor: '#FEF5EC', // Keep white border on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FEF5EC', // Border color on focus
            },
          },
          '& .MuiInputBase-input': {
            color: '#FEF5EC', // Input text color
          },
          '& .MuiInputLabel-root': {
            color: '#FEF5EC',// Label color
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#FEF5EC', // Focused label color
          },
        }}>
      </TextField>
    </>
  )
};

export { Input, PasswordInput, SelectInput,InputArea };