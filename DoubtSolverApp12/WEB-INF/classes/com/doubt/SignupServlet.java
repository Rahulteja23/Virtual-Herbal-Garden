
package com.doubt;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;

public class SignupServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        String user = req.getParameter("username");
        String email = req.getParameter("email");
        String pass = req.getParameter("password");

        if (user == null || user.trim().isEmpty() || 
            email == null || email.trim().isEmpty() || 
            pass == null || pass.trim().isEmpty()) {
            res.sendRedirect("signup.html?error=missing");
            return;
        }

        try (Connection conn = DBConnection.getConnection()) {
            String sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setString(1, user.trim());
                ps.setString(2, email.trim());
                ps.setString(3, pass);
                ps.executeUpdate();
                res.sendRedirect("login.html?signup=success");
            }
        } catch (SQLIntegrityConstraintViolationException e) {
            res.sendRedirect("signup.html?error=exists");
        } catch (Exception e) {
            e.printStackTrace();
            res.getWriter().println("Error: " + e.getMessage());
        }
    }
}
