insert into
  Employee (
    first_Name,
    last_name,
    email,
    user_type,
    hash,
    date_created,
    phone_number
  )
values
  ($1, $2, $3, $4, $5, $6, $7) returning *;