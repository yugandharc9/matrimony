import { useImperativeHandle, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';  // Importing eye icons from react-icons
import { TextField, FormHelperText, MenuItem } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { forwardRef } from "react";

const Input = forwardRef(({ placeholder, type, isRequired, labelName, helperText, inputProps, inputLabelProps }, ref) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const getVal = () => {
    return value;
  }

  const setVal = (v) => {
    setValue(v);
  }


  useImperativeHandle(ref, () => ({
    getVal,
    setVal,
  }));


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
        onChange={handleChange}
        InputProps={{...inputProps}}
        InputLabelProps={{...inputLabelProps}}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#492532', // Background color
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
});

const PasswordInput = forwardRef(({ prop }, ref) => {

  const [showPassword, setShowPassword] = useState(false);
  const [pwd, setPwd] = useState('');

  const handleChange = (e) => {
    setPwd(e.target.value);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const getVal = () => {
    return pwd;
  }

  useImperativeHandle(ref, () => ({
    getVal,
  }));

  return (
    <>
      <Input
        labelName="Password"
        type={showPassword ? 'text' : 'password'}
        value={pwd}
        ref={ref}
        onChange={handleChange}
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
});

const SelectInput = forwardRef(({ placeholder, labelName, isRequired, selectVals, helperText }, ref) => {
  const [value, setValue] = useState("")

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const getVal = () => {
    return value;
  }

  const setVal = (v) => {
    setValue(v);
  }

  useImperativeHandle(ref, () => ({
    getVal,
    setVal,
  }))

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
      defaultValue=""
      value={value}
      onChange={handleChange}
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
          // new
          '& .MuiMenuItem-root.Mui-selected': {
            backgroundColor: 'transparent', // No gray background
            '&:hover': {
              backgroundColor: '#f5f5f5', // Custom hover color
            },
          },
          '& .MuiMenuItem-root:focus': {
            backgroundColor: 'transparent', // No gray background on focus
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

});


const InputArea = forwardRef(({ placeholder,  isRequired,  labelName, helperText, rows }, ref) => {
  const [value, setValue] = useState("")

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const getVal = () => {
    return value;
  }

  const setVal = (v) => {
    setValue(v);
  }

  useImperativeHandle(ref, () => ({
    getVal,
    setVal
  }))
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
        onChange={handleChange}
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
});


export { Input, PasswordInput, SelectInput, InputArea };