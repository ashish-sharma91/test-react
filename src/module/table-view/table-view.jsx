import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";
import "./table-view.scss";
import CustomSwitch from "../../components/switch";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TableView() {
  const [tableData, setTableData] = useState([]);
  const [fTableData, setFtableData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  useEffect(() => {
    Axios.get(`https://reqres.in/api/users?page=${page + 1}`).then((res) => {
      setTableData(res.data.data);
      setFtableData(res.data.data);
    });
  }, [page]);

  const classes = useStyles();

  function onChange(e) {
    let body = document.querySelector("body");
    if (e) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function onSearchChange(e) {
    let key = e.target.value;
    let data = tableData;
    data = data.filter((el) => {
      if (el.first_name.includes(key) || el.email.includes(key)) {
        return true;
      }
    });
    setFtableData(data);
  }

  return (
    <>
      <h1>Data Table</h1>
      <div className="spaced-between">
        <CustomSwitch onChange={onChange}></CustomSwitch>
        <TextField
          id="standard-basic"
          label="Search by firstname or email"
          onChange={onSearchChange}
        />
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>FirstName</TableCell>
              <TableCell>LastName</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fTableData.map((el) => (
              <TableRow key={el.id}>
                <TableCell>{el.id}</TableCell>
                <TableCell>
                  <img src={el.avatar} alt="avatar" />
                </TableCell>
                <TableCell>{el.first_name}</TableCell>
                <TableCell>{el.first_name}</TableCell>
                <TableCell>{el.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[6, 12]}
        component="div"
        count={12}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
