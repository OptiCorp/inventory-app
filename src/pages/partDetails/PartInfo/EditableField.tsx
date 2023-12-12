import { MenuItem, TextField } from '@mui/material'
import { Edit, InfoContainer } from './styles'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { ItemFields } from './PartInfo'
import { Controller, useFormContext } from 'react-hook-form'
import { PartSchemaTest } from '../useUpdatePartForm'

/* import { Controller, useFormContext } from 'react-hook-form' */

type Types = 'Unit' | 'Assembly' | 'Sub-Assembly' | 'Part'

type EditableFieldProps = {
    label: ItemFields
    defaultValue: string | null
    onBlur: (data: PartSchemaTest) => void
    isSelect?: boolean
    options?: Types[]
    activeEditMode: ItemFields | null
    setActiveEditMode: React.Dispatch<React.SetStateAction<ItemFields | null>>
    handleSelectChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    handleInputChange?: (
        value: string | undefined
    ) => void /* (fieldName: keyof UpdateItem, value: string | undefined) => void */
    selectedType?: string
}
const EditableField = ({
    label,
    defaultValue,
    onBlur,
    isSelect = false,
    options,
    activeEditMode,
    setActiveEditMode,
    handleSelectChange,
    selectedType,
    handleInputChange,
}: EditableFieldProps) => {
    /*  const {
        formState: { errors },
    } = useForm() */
    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useFormContext()
    console.log(watch())

    return (
        <div>
            <label>
                <strong>{label.toUpperCase()}</strong>
            </label>

            <InfoContainer>
                {
                    isSelect ? (
                        <TextField
                            {...register('type')}
                            onBlur={onBlur}
                            select
                            onChange={handleSelectChange}
                            SelectProps={{
                                IconComponent: () =>
                                    activeEditMode !== label ? null : <ArrowDropDownIcon />,
                            }}
                            variant="standard"
                            value={selectedType ? selectedType : defaultValue}
                            InputProps={{
                                disableUnderline: activeEditMode !== label,
                                readOnly: activeEditMode !== label,
                            }}
                        >
                            {options?.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    ) : (
                        <Controller
                            name={defaultValue ?? ''}
                            control={control}
                            rules={{ required: 'required' }}
                            render={({ field: { ref, ...props }, fieldState: { error } }) => {
                                return (
                                    <TextField
                                        {...props}
                                        inputRef={ref}
                                        helperText={error?.message}
                                        variant="standard"
                                        InputProps={{
                                            disableUnderline: activeEditMode !== label,
                                            readOnly: activeEditMode !== label,
                                        }}
                                        {...register(label, {
                                            onBlur: handleSubmit(onBlur, console.log),
                                        })}
                                        onChange={(e) => handleInputChange?.(e.target.value)}
                                        defaultValue={defaultValue}
                                    />
                                )
                            }}
                        />
                    ) /* (
                    <TextField
                        variant="standard"
                        InputProps={{
                            disableUnderline: activeEditMode !== label,
                            readOnly: activeEditMode !== label,
                        }}
                        {...register(label)}
                        onBlur={onBlur}
                        onChange={(e) => handleInputChange?.(e.target.value)}
                        defaultValue={defaultValue}
                    />
                ) */
                }

                <Edit
                    onClick={() =>
                        setActiveEditMode((prevMode) => (prevMode === label ? null : label))
                    }
                />
            </InfoContainer>
        </div>
    )
}

export default EditableField

{
    /* <Controller
                        name={defaultValue!}
                        control={control}
                        render={({ field: { ref, ...props }, fieldState: { error } }) => (
                            <TextField
                                {...props}
                                inputRef={ref}
                                helperText={error?.message}
                                variant="standard"
                                InputProps={{
                                    disableUnderline: activeEditMode !== label,
                                    readOnly: activeEditMode !== label,
                                }}
                                {...register(label)}
                                onBlur={onBlur}
                                onChange={(e) => handleInputChange?.(e.target.value)}
                                defaultValue={defaultValue}
                            />
                        )}
                        
                    /> */
}
