insert into
  Customer (
    first_name,
    last_name,
    email,
    hash,
    date_created,
    phone_number
  )
values
  ($1, $2, $3, $4, $5, $6) returning *;