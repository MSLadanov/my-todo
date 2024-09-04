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
