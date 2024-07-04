import { QueryResult } from "pg";

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
// const User = connection.models.User;

function initialize(passport: any) {
  const authenticateUser = (
    email: string,
    password: string,
    done: CallableFunction
  ) => {
    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err: Error, results: QueryResult) => {
        if (err) {
          throw err;
        }

        // Check if user is in database
        if (results.rows.length > 0) {
          const user = results.rows[0];

          bcrypt.compare(
            password,
            user.password,
            (err: Error, isMatch: Boolean) => {
              if (err) {
                throw err;
              }

              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, {
                  message: "Password is not correct!",
                });
              }
            }
          );
        } else {
          return done(null, false, { message: "Email is not registered!" });
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );

  //Stores user id in session cookie
  passport.serializeUser(
    (user: Record<string, string> = {}, done: CallableFunction) => {
      done(null, user.id);
    }
  );

  // Uses session id to store info about the object in database
  passport.deserializeUser((id: string, done: CallableFunction) => {
    pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [id],
      (err: Error, results: QueryResult) => {
        if (err) {
          throw err;
        }

        return done(null, results.rows[0]);
      }
    );
  });
}

module.exports = initialize;

// const customFields = {
//   usernameField: "username",
//   passwordField: "password",
// };

// // A function that you pass results of authentication to.
// const verifyCallback = (
//   username: string,
//   password: string,
//   done: CallableFunction
// ) => {
//   User.findOne({ username: username })
//     .then((user: string) => {
//       if (!user) {
//         return done(null, false);
//       }

//       const isValid = validPassword(password, user.hash, user.salt);

//       if (isValid) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//       }
//     })
//     .catch((err: Error) => {
//       done(err);
//     });
// };

// const strategy = new LocalStrategy(customFields, verifyCallback);

// passport.use(strategy);

// passport.serializeUser((user: string, done: CallableFunction) => {
//   done(null, user.id);
// });

// passport.deserializeUser((userId: string, done: CallableFunction) => {
//   User.findById(userId)
//     .then((user: string) => {
//       done(null, user);
//     })
//     .catch((err: Error) => done(err));
// });
