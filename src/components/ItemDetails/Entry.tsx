import { format } from 'date-fns';
import { LogEntry } from '../../services/apiTypes';
import { Typography } from '@mui/material';

export const Entry = ({ entry }: { entry: LogEntry }) => {
    const date = format(new Date(entry.createdDate), 'dd.MM.yyyy').toString();
    return (
        <Typography>
            {`${date}: ${entry.message} by ${entry.createdBy.firstName} ${entry.createdBy.lastName}`}
        </Typography>
    );
};
