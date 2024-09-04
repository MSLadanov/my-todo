<h1>My Todo</h1>
<p>Это приложение для управления задачами, которое со временем расширилось, добавив функционал профиля, регистрации, авторизации и общения в чатах.</p>
<h2>Возможности</h2>
<ul>
  <li>Управление задачами: добавление, редактирование, удаление и отметка как выполненных</li>
  <li>Регистрация и аутентификация пользователей через Firebase</li>
  <li>Профиль пользователя: редактирование информации, включая аватар</li>
  <li>Общение в чатах с другими пользователями</li>
  <li>Адаптивный дизайн</li>
</ul>
<h2>Установка</h2>
  <ol>
    <li><strong>Клонируйте репозиторий:</strong>
      <pre><code>git clone https://github.com/MSLadanov/my-todo.git
cd my-todo</code></pre>
    </li>
    <li><strong>Установите зависимости:</strong>
      <pre><code>npm install</code></pre>
    </li>
    <li><strong>Настройте Firebase:</strong>
<ul>
  <li>Создайте проект в <a href="https://console.firebase.google.com/">Firebase Console</a>.</li>
  <li>Добавьте веб-приложение в свой проект Firebase и скопируйте конфигурацию.</li>
  <li>Создайте файл <code>.env</code> в корневой директории и добавьте вашу конфигурацию Firebase:</li>
</ul>
<pre><code>REACT_APP_API_KEY=your_api_key
REACT_APP_AUTH_DOMAIN=your_auth_domain
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_storage_bucket
REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_APP_ID=your_app_id</code></pre>
  </li>
  <li>Создайте папку userAvatars в Firebase Storage для хранения пользовательских аватарок</li>
  <li>Настройте Realtime Database и Firebase storage согласно firebase-database-rules.json firebase-database-structure.json и firebase-storage-rules.txt</li>
  <li><strong>Запустите приложение:</strong>
    <pre><code>npm start</code></pre>
    <p>Приложение будет доступно по адресу <code>http://localhost:3000</code>.</p>
  </li>
</ol>
<h2>Использование</h2>
<ul>
  <li><strong>Управление задачами:</strong> Создавайте, редактируйте и удаляйте задачи, отмечайте их как выполненные.</li>
  <li><strong>Профиль пользователя:</strong> Редактируйте информацию профиля, включая загрузку аватара.</li>
  <li><strong>Регистрация и вход:</strong> Зарегистрируйтесь и войдите в систему для доступа к персонализированным данным.</li>
  <li><strong>Чаты:</strong> Общайтесь с другими пользователями.</li>
</ul>
<h2>Используемые технологии</h2>
  <ul>
    <li>React</li>
    <li>Firebase</li>
    <li>Styled-components</li>
    <li>React Router</li>
    <li>React Query</li>
  </ul>
<h1>Вьюшки</h1>
<div>
  <h2>Авторизация</h2>
  <img width="516" alt="Снимок экрана 2024-09-04 в 20 44 09" src="https://github.com/user-attachments/assets/9f77aa23-eb14-4665-9f24-15737f3f6770">
</div>
<div>
  <h2>Регистрация</h2>
  <img width="516" alt="Снимок экрана 2024-09-04 в 20 44 17" src="https://github.com/user-attachments/assets/9c0f351c-9d97-4f71-baa8-28485bcb65ab">
</div>
<div>
  <h2>Страница текущего пользователя</h2>
  <img width="351" alt="Снимок экрана 2024-09-04 в 20 43 24" src="https://github.com/user-attachments/assets/7455cd03-73b0-4eea-9670-bda2eec2a21a">
</div>
<div>
  <h2>Страница пользователя</h2>
  <img width="518" alt="Снимок экрана 2024-09-04 в 20 42 02" src="https://github.com/user-attachments/assets/ee52ec18-b44e-452e-a764-c04f3c9ece77">
</div>
<div>
  <h2>Список To-Do листов</h2>
  <img width="518" alt="Снимок экрана 2024-09-04 в 20 42 20" src="https://github.com/user-attachments/assets/e987f0cf-47b6-4051-8bdc-ba6d133ea557">
</div>
<div>
  <h2>Создание To-Do листа</h2>
  <img width="518" alt="Снимок экрана 2024-09-04 в 20 42 28" src="https://github.com/user-attachments/assets/494db98f-77b1-4cf3-b8bf-91c8592c99af">
</div>
<div>
  <h2>Список пользователей</h2>
  <img width="518" alt="Снимок экрана 2024-09-04 в 20 41 45" src="https://github.com/user-attachments/assets/b9e9eed2-6be8-4736-a70a-ee93c4c4d65c">
</div>
<div>
  <h2>Страница чата (для каждого из собеседников)</h2>
  <img width="1036" alt="Снимок экрана 2024-09-04 в 20 46 03" src="https://github.com/user-attachments/assets/88524624-b990-421b-b33e-9a3af9c2e442">
</div>
