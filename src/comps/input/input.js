import { useImperativeHandle, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Importing eye icons from react-icons
import { TextField, FormHelperText, MenuItem } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { forwardRef } from 'react';

const Input = forwardRef(
  (
    {
      placeholder,
      type,
      isRequired,
      labelName,
      helperText,
      inputProps,
      inputLabelProps,
      disabled,
      styleProps,
      autoComplete,
    },
    ref
  ) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
      setValue(e.target.value);
    };

    const getVal = () => {
      return value;
    };

    const setVal = (v) => {
      setValue(v);
    };

    useImperativeHandle(ref, () => ({
      getVal,
      setVal,
    }));

    return (
      <>
        <TextField
          className='bg-white rounded-lg'
          variant='outlined'
          type={type}
          helperText={
            helperText && (
              <FormHelperText sx={{ color: '#492533' }}>
                {helperText}
              </FormHelperText>
            )
          }
          placeholder={placeholder}
          label={labelName}
          required={isRequired}
          value={value}
          onChange={handleChange}
          InputProps={{
            ...inputProps,
          }}
          InputLabelProps={{ ...inputLabelProps }}
          disabled={disabled}
          autoComplete={autoComplete ? autoComplete : ''}
          sx={{
            ...styleProps,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#492532', // Background color
              color: '#F0D0A6', // Text color
              '& fieldset': {
                borderColor: '#FEF5EC', // Default white border color
              },
              '&:hover fieldset': {
                borderColor: disabled ? '#3a1f2b' : '#FEF5EC', // Keep border color when disabled
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FEF5EC', // Border color on focus
              },
              '&.Mui-disabled': {
                backgroundColor: '#3a1f2b', // Background color when disabled
                color: '#a0a0a0', // Text color when disabled
              },
            },
            '& .MuiInputBase-input': {
              color: '#FEF5EC', // Input text color
              '&.Mui-disabled': {
                WebkitTextFillColor: '#a0a0a0', // Text color when disabled
              },
            },
            '& .MuiInputLabel-root': {
              color: '#FEF5EC', // Label color
              '&.Mui-disabled': {
                color: '#a0a0a0', // Label color when disabled
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#FEF5EC', // Focused label color
            },
          }}
        ></TextField>
      </>
    );
  }
);

const PasswordInput = forwardRef(({ prop }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [pwd, setPwd] = useState('');

  const handleChange = (e) => {
    console.log('pwd val', e);
    setPwd(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getVal = () => {
    return pwd;
  };

  useImperativeHandle(ref, () => ({
    getVal,
  }));

  return (
    <>
      <TextField
        label='Password'
        type={showPassword ? 'text' : 'password'}
        value={pwd}
        variant='outlined'
        ref={ref}
        required
        onChange={handleChange}
        inputProps={{
          endAdornment: (
            <InputAdornment position='end'>
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
                edge='end'
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible color='white' size={20} />
                ) : (
                  <AiOutlineEye color='white' size={20} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
            color: '#FEF5EC', // Label color
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#FEF5EC', // Focused label color
          },
        }}
      />
    </>
  );
});

const SelectInput = forwardRef(
  (
    { placeholder, labelName, isRequired, selectVals, helperText, disabled },
    ref
  ) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
      setValue(e.target.value);
    };

    const getVal = () => {
      return value;
    };

    const setVal = (v) => {
      setValue(v);
    };

    useImperativeHandle(ref, () => ({
      getVal,
      setVal,
    }));

    return (
      <>
        <TextField
          className='bg-white rounded-lg'
          variant='outlined'
          select
          fullWidth
          helperText={
            helperText && (
              <FormHelperText sx={{ color: '#492533' }}>
                {helperText}
              </FormHelperText>
            )
          }
          placeholder={placeholder}
          label={labelName}
          required={isRequired}
          defaultValue=''
          value={value}
          onChange={handleChange}
          disabled={disabled}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#492533', // Background color
              color: '#F0D0A6', // Text color
              '& fieldset': {
                borderColor: '#FEF5EC', // Default white border color
              },
              '&:hover fieldset': {
                borderColor: disabled ? '#3a1f2b' : '#FEF5EC', // Keep border color when disabled
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FEF5EC', // Border color on focus
              },
              '&.Mui-disabled': {
                backgroundColor: '#3a1f2b', // Background color when disabled
                color: '#a0a0a0', // Text color when disabled
              },
            },
            '& .MuiSelect-icon': {
              color: '#FEF5EC', // Set the arrow color here
              '&.Mui-disabled': {
                color: '#a0a0a0', // Arrow color when disabled
              },
            },
            '& .MuiInputBase-input': {
              color: '#FEF5EC', // Input text color
              '&.Mui-disabled': {
                WebkitTextFillColor: '#a0a0a0', // Text color when disabled
              },
            },
            '& .MuiInputLabel-root': {
              color: '#FEF5EC', // Label color
              '&.Mui-disabled': {
                color: '#a0a0a0', // Label color when disabled
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#FEF5EC', // Focused label color
            },
            '& .MuiMenuItem-root.Mui-selected': {
              backgroundColor: 'transparent', // No gray background
              '&:hover': {
                backgroundColor: '#F5F5F5', // Custom hover color
              },
            },
            '& .MuiMenuItem-root:focus': {
              backgroundColor: 'transparent', // No gray background on focus
            },
          }}
        >
          {selectVals &&
            selectVals.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{
                  backgroundColor: '#492533', // Default background color for menu item
                  color: '#FEF5EC', // Default text color for menu item
                  '&:hover': {
                    backgroundColor: '#F0D0A6', // Hover background color
                    color: '#492533', // Hover text color
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#F0D0A6', // Selected background color
                    color: '#492533', // Selected text color
                    '&:hover': {
                      backgroundColor: '#F5F5F5', // Hover background color when selected
                      color: '#492533', // Hover text color when selected
                    },
                  },
                  '&.Mui-focusVisible': {
                    backgroundColor: '#F0D0A6', // Background color when focused
                    color: '#492533', // Text color when focused
                  },
                  '&:focus': {
                    backgroundColor: '#F0D0A6', // Background color for focused items using arrow keys
                    color: '#492533', // Text color for focused items
                  },
                  '&.Mui-disabled': {
                    backgroundColor: '#3a1f2b', // Background color when disabled
                    color: '#a0a0a0', // Text color when disabled
                  },
                }}
              >
                {option.label}
              </MenuItem>
            ))}
        </TextField>
      </>
    );
  }
);

const InputArea = forwardRef(
  ({ placeholder, isRequired, labelName, helperText, rows }, ref) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
      setValue(e.target.value);
    };

    const getVal = () => {
      return value;
    };

    const setVal = (v) => {
      setValue(v);
    };

    useImperativeHandle(ref, () => ({
      getVal,
      setVal,
    }));
    return (
      <>
        <TextField
          className='bg-white rounded-lg'
          variant='outlined'
          multiline
          helperText={
            helperText && (
              <FormHelperText sx={{ color: '#492533' }}>
                {helperText}
              </FormHelperText>
            )
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
              color: '#FEF5EC', // Label color
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#FEF5EC', // Focused label color
            },
          }}
        ></TextField>
      </>
    );
  }
);

export { Input, PasswordInput, SelectInput, InputArea };


