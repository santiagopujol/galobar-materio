import React from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';

const ClientesListItem = ({ element }: any) => {

  return (
    <>
      <ListItemButton key={element.id} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={`${element.merge_fields.FNAME.toUpperCase()}`} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={`${element.merge_fields.FNAME.toUpperCase()} ${element.merge_fields.LNAME.toUpperCase()}`}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              </Typography>
              {element.email_address}
            </React.Fragment>
          }
        />
      </ListItemButton>
      {/* <tr key={element.id} className=" hover:bg-gray-200 opacity-90 hover:opacity-100 shadow-sm shadow-slate-300/50"
        onClick={() => {
          setLoadingState(true);
        }}>
        <Link passHref href={'/clientes/' + element.id}>
          <td scope="row" className="cursor-pointer text-gray-900 ">
            <button
              type="button"
              className="px-3 py-3 font-bold rounded inline-flex items-center "
            >
              <div className="relative w-10 h-10 mr-4 mb-2 overflow-hidden rounded-full ">
                <svg
                  className={'absolute w-12 h-12 -left-1 ' + customStyles.col_primary_app}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className={`text-left ${customStyles.font_app_content}`}>
                <b className="text-gray-900 text-md">
                  {element.merge_fields.FNAME.toUpperCase()}{' '}
                  {element.merge_fields.LNAME.toUpperCase()}
                </b>
                <p className="text-gray-500 text-sm"> {element.email_address}</p>
              </div>
              <div className="absolute right-2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </td>
        </Link>
      </tr> */}
    </>
  );
};

export default ClientesListItem;
