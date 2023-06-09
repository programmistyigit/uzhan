import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';




export default function AccessibleTable() {

    const allusers = useSelector(e=>e.allusers)

    return (
    <TableContainer component={Paper}>
      <Table  aria-label="caption table">
        <caption>Hozircha mavjud userlar soni {allusers.length} ta</caption>
        <TableHead>
          <TableRow>
            <TableCell>ism </TableCell>
            <TableCell align="right">U.K.S soni</TableCell>
            <TableCell align="right">togri</TableCell>
            <TableCell align="right">xato</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allusers.map((row) => (
            <TableRow key={row.login}>
              <TableCell component="th" scope="row">
                {row.login}
              </TableCell>
              <TableCell align="right">{row.quizAllTests}</TableCell>
              <TableCell align="right">{row.quizAllRank}</TableCell>
              <TableCell align="right">{row.quizAllTests - row.quizAllRank}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
