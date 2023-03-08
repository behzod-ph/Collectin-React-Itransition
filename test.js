import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "@types/react";

items
    .types
    .((column, ind) => {
        return (column.name === 'tag' ? '' :

                <TableCell key={column.id} align={option.align}
                           style={{
                               minWidth: option.minWidth,
                               height: option.height
                           }}>
                    {
                        items.values[key]
                            .map(cell => column.id === cell.field_id ?
                                column.format && typeof value === 'number'
                                    ? column.format(cell.value)
                                    : cell.value
                                : '')
                    }
                </TableCell>,
                (ind + 1) === items.types.length ?
                    < TableCell key={column.id} align={option.align}
                                style={{
                                    minWidth: option.minWidth,
                                    height: option.height
                                }}>
                        < IconButton aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton aria-label="edit">
                            <EditIcon/>
                        </IconButton>
                    </TableCell> : ''
        )
    })
}
}

for (let i = 0; i <= items.types.length; i++) {
    let column = items.types[i];
    if (column.name !== 'tag') {
        return (
            i !== items.types.length ? <TableCell key={column.id} align={option.align}
                                                  style={{
                                                      minWidth: option.minWidth,
                                                      height: option.height
                                                  }}>
                    {
                        items.values[key]
                            .map(cell => column.id === cell.field_id ?
                                column.format && typeof value === 'number'
                                    ? column.format(cell.value)
                                    : cell.value
                                : '')
                    }
                </TableCell> :
                < TableCell key={column.id} align={option.align}
                            style={{
                                minWidth: option.minWidth,
                                height: option.height
                            }}>
                    < IconButton aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton aria-label="edit">
                        <EditIcon/>
                    </IconButton>
                </TableCell>
        )
    }

}