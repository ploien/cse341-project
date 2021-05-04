const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === "/") {   //Main page containing from to add user data
        res.setHeader('Content-Type', 'text/html');
        res.write("<html>");
        res.write("<head><title>Home Page: Prove 01</title></head>");
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Create User</button></form></body>');
        res.write("</html>");

        return res.end();
    }


    if(url ==="/create-user" && method === 'POST') {                     //Action page after create-user form is submitted
        req.on('data', (chunk) => {
            let userName = chunk.toString('utf8');
            userName = userName.substring(userName.indexOf('=')+1);
            console.log(userName);
           fs.writeFile('users.txt', userName + '\n', {flag: 'a'}, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/'); //redirect to add another name after username submission
                return res.end();
           });
        });
    };

    if(url ==="/users") {       //Page containing list of users
        
        const dummyUsers = ["Wendy", "Sam", "Dorothy"];
        res.setHeader('Content-Type', 'text/html');
        res.write("<html>");
        res.write("<head><title>Prove: 01 User Page</title></head>");
        res.write("<body><h3>Users</h3>");
        res.write("<ul>");
        dummyUsers.forEach((value) => res.write("<li>" + value + "</li>"));
        res.write('</ul>');
        res.write("</body>");
        res.write("</html>");

        return res.end();
    }
    
}



module.exports = requestHandler;