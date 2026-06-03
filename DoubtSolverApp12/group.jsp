<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    // Handle Logout
    if ("true".equals(request.getParameter("logout"))) {
        session.invalidate();
        response.sendRedirect("login.html");
        return;
    }

    // Session validation
    HttpSession sessionObj = request.getSession(false);
    if (sessionObj == null || sessionObj.getAttribute("username") == null) {
        response.sendRedirect("login.html");
        return;
    }
    String loggedInUser = (String) sessionObj.getAttribute("username");
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Public Doubt Group - Virtual Herbal Garden</title>
    <!-- Google Fonts - Poppins -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <style>
        :root {
            --primary: #2ecc71;
            --primary-dark: #27ae60;
            --glass-bg: rgba(255, 255, 255, 0.92);
            --text-color: #2c3e50;
            --text-muted: #7f8c8d;
        }

        body {
            margin: 0;
            font-family: 'Poppins', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            overflow: hidden;
            background-color: #f4f4f4;
        }

        /* Video background */
        .video-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;
            filter: brightness(0.7);
        }

        .group-container {
            background-color: var(--glass-bg);
            padding: 30px;
            width: 700px;
            max-width: 90%;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.25);
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            z-index: 10;
        }

        .chat-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #eef2f5;
            padding-bottom: 15px;
            margin-bottom: 20px;
        }

        .chat-header h2 {
            margin: 0;
            font-size: 1.5rem;
            color: #27ae60;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .user-badge {
            background-color: rgba(46, 204, 113, 0.15);
            color: var(--primary-dark);
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .btn-logout {
            background-color: #e74c3c;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 8px;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
            font-size: 0.85rem;
            font-weight: 500;
            transition: background 0.3s;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .btn-logout:hover {
            background-color: #c0392b;
        }

        .chat-box {
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 15px;
            height: 350px;
            overflow-y: auto;
            margin-bottom: 20px;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .message {
            padding: 10px 14px;
            border-radius: 12px;
            max-width: 80%;
            line-height: 1.4;
            font-size: 0.9rem;
            animation: messageFadeIn 0.3s;
        }

        .message-sent {
            align-self: flex-end;
            background-color: #d1fae5;
            color: #065f46;
            border-bottom-right-radius: 2px;
        }

        .message-received {
            align-self: flex-start;
            background-color: #f3f4f6;
            color: #1f2937;
            border-bottom-left-radius: 2px;
        }

        .message b {
            display: block;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
            color: #374151;
        }

        .message-received b {
            color: #4b5563;
        }

        .message-ai {
            align-self: flex-start;
            background-color: #e0f2fe;
            color: #0369a1;
            border-bottom-left-radius: 2px;
            border-left: 4px solid #0284c7;
        }

        .message-ai b {
            color: #0369a1;
        }

        @keyframes messageFadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .input-area {
            display: flex;
            gap: 10px;
        }

        .input-area input {
            flex-grow: 1;
            padding: 12px 15px;
            border-radius: 10px;
            border: 1px solid #cbd5e1;
            outline: none;
            font-size: 0.95rem;
            font-family: 'Poppins', sans-serif;
            transition: border 0.3s;
        }

        .input-area input:focus {
            border-color: var(--primary);
        }

        .btn-send {
            padding: 0 20px;
            background-color: var(--primary);
            border: none;
            color: white;
            cursor: pointer;
            border-radius: 10px;
            font-weight: 600;
            font-family: 'Poppins', sans-serif;
            transition: background 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .btn-send:hover {
            background-color: var(--primary-dark);
        }

        /* Notification Panel */
        #notifyBox {
            display: none;
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #fff;
            border-left: 5px solid #2ecc71;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            max-width: 300px;
            z-index: 100;
            animation: slideIn 0.3s forwards;
        }

        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        #notifyBox h4 {
            margin: 0 0 5px 0;
            color: #27ae60;
            font-size: 0.9rem;
        }

        #notifyText {
            font-style: italic;
            font-size: 0.85rem;
            color: #34495e;
            word-break: break-word;
        }

        .btn-action {
            margin-top: 10px;
            background: #2ecc71;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 0.8rem;
            cursor: pointer;
            transition: background 0.2s;
        }

        .btn-action:hover {
            background: #27ae60;
        }

        .back-home {
            position: absolute;
            top: 20px;
            left: 20px;
            color: #fff;
            text-decoration: none;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: color 0.3s;
            z-index: 10;
        }

        .back-home:hover {
            color: var(--primary);
        }
    </style>
</head>
<body>
    <video autoplay muted loop playsinline class="video-bg">
        <source src="1777892-hd_1280_720_25fps.mp4" type="video/mp4">
        Your browser does not support HTML5 video.
    </video>

    <a href="../index.html" class="back-home">
        <i class="fa-solid fa-arrow-left"></i> Back to Garden
    </a>

    <div class="group-container">
        <div class="chat-header">
            <h2><i class="fa-solid fa-comments"></i> Public Doubt Solver</h2>
            <div style="display: flex; gap: 10px; align-items: center;">
                <div class="user-badge">
                    <i class="fa-solid fa-user-circle"></i>
                    <span id="current-user-display"><%= loggedInUser %></span>
                </div>
                <button class="btn-logout" onclick="location.href='group.jsp?logout=true'">
                    <i class="fa-solid fa-sign-out-alt"></i> Logout
                </button>
            </div>
        </div>

        <div id="chatBox" class="chat-box">
            <div class="message message-received">
                <b>System</b>
                Welcome to the Public Doubt Solver! Feel free to ask any herbal queries.
            </div>
        </div>

        <div class="input-area">
            <input type="text" id="doubtInput" placeholder="Type your herbal query here..." onkeypress="handleKeyPress(event)" />
            <button class="btn-send" onclick="sendDoubt()">
                Send <i class="fa-solid fa-paper-plane"></i>
            </button>
        </div>
    </div>

    <div id="notifyBox">
        <h4>New Doubt Posted!</h4>
        <span id="notifyText"></span>
        <br>
        <button class="btn-action" onclick="acceptDoubt()">Answer It</button>
    </div>

    <script>
        const loggedInUser = "<%= loggedInUser %>";
        let answered = false;
        let lastDoubt = "";

        function handleKeyPress(e) {
            if (e.key === 'Enter') {
                sendDoubt();
            }
        }

        function sendDoubt() {
            const doubtInput = document.getElementById("doubtInput");
            const doubt = doubtInput.value.trim();
            if (!doubt) return;
            
            const chatBox = document.getElementById("chatBox");
            chatBox.innerHTML += `
                <div class="message message-sent">
                    <b>${loggedInUser}</b>
                    ${doubt}
                </div>
            `;
            doubtInput.value = "";
            chatBox.scrollTop = chatBox.scrollHeight;
            
            lastDoubt = doubt;
            notifyOnlineUsers(doubt);
            answered = false;
            
            // Trigger AI reply after a short delay
            setTimeout(() => aiFallbackAnswer(doubt), 2000);
        }

        function notifyOnlineUsers(doubt) {
            const box = document.getElementById("notifyBox");
            const text = document.getElementById("notifyText");
            text.innerText = `"${doubt}"`;
            box.style.display = "block";
            
            // Auto hide notification after 8 seconds
            setTimeout(() => {
                box.style.display = "none";
            }, 8000);
        }

        function acceptDoubt() {
            if (answered) return;
            document.getElementById("notifyBox").style.display = "none";
            
            let userAnswer = prompt(`Enter your response to: "${lastDoubt}"`);
            if (userAnswer && userAnswer.trim() !== "") {
                answered = true;
                const chatBox = document.getElementById("chatBox");
                chatBox.innerHTML += `
                    <div class="message message-sent">
                        <b>${loggedInUser} (Answer)</b>
                        ${userAnswer}
                    </div>
                `;
                chatBox.scrollTop = chatBox.scrollHeight;
                evaluateAnswer(userAnswer);
            }
        }

        async function evaluateAnswer(answer) {
            const prompt = `The user "${loggedInUser}" answered: ${answer}. Is this a correct response to the original doubt "${lastDoubt}"? Reply in 1 sentence.`;
            try {
                // Securely check if endpoint works, otherwise fallback
                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // Note: Keys should be set securely via backend. We keep this client request active as fallback.
                        "Authorization": "Bearer sk-or-v1-placeholder-key-replace-in-production"
                    },
                    body: JSON.stringify({
                        model: "openai/gpt-3.5-turbo",
                        messages: [
                            { role: "system", content: "You are an AI botanical expert evaluating student answers." },
                            { role: "user", content: prompt }
                        ]
                    })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    const aiReply = data.choices[0].message.content;
                    displayAIReply(aiReply, "AI Reviewer");
                } else {
                    displayAIReply("Thanks for the response! The community will review it.", "System");
                }
            } catch (err) {
                displayAIReply("Thanks for the response! The community will review it.", "System");
            }
        }

        async function aiFallbackAnswer(doubt) {
            if (answered) return;
            try {
                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer sk-or-v1-placeholder-key-replace-in-production"
                    },
                    body: JSON.stringify({
                        model: "openai/gpt-3.5-turbo",
                        messages: [
                            { role: "system", content: "You're a helpful botanical assistant answering student doubts about herbs." },
                            { role: "user", content: doubt }
                        ]
                    })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    const aiReply = data.choices[0].message.content;
                    if (!answered) {
                        displayAIReply(aiReply, "AI Expert");
                    }
                } else {
                    displayAIReply("Searching database... No exact offline matches found. An expert will respond soon.", "System");
                }
            } catch (err) {
                displayAIReply("Searching database... No exact offline matches found. An expert will respond soon.", "System");
            }
        }

        function displayAIReply(reply, sender) {
            const chatBox = document.getElementById("chatBox");
            chatBox.innerHTML += `
                <div class="message message-ai">
                    <b>${sender}</b>
                    ${reply}
                </div>
            `;
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    </script>
</body>
</html>
