package com.doubt;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

        String email = request.getParameter("email");
        String password = request.getParameter("password");

        try {
            Connection conn = DBConnection.getConnection();

            // Validate user
            String sql = "SELECT username FROM users WHERE email=? AND password=?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, email);
            stmt.setString(2, password);

            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                // User found
                String username = rs.getString("username");

                HttpSession session = request.getSession();
                session.setAttribute("username", username);  // Used in group.jsp

                response.sendRedirect("group.jsp");
            } else {
                // Login failed
                response.sendRedirect("login.html?error=1");
            }

            conn.close();

        } catch (Exception e) {
            e.printStackTrace();
            response.getWriter().println("Error occurred: " + e.getMessage());
        }
    }
}
