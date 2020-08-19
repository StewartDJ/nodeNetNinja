<html lang="en">
<%- include("./partials/head.ejs") %>

<body>
  <%- include("./partials/nav.ejs") %>

  <div class="details content">
    <h2><%= blog.title %></h2>
    <div class="content">
      <p><%= blog.body %></p>
    </div>
    <a class="delete" data-doc="<%= blog._id %>">delete</a>
  </div>

  <script>
      const trashcan = document.querySelector('a.delete');
      trasncan.addEventListener('click', (e) => {
          const endpoint = '/blogs/${trashcan.dataset.doc}';

          fetch(endpoint, {
              method: 'DELETE'
          })
          .then((response) => response.json())
          .then((data) => window.location.href = data.redirect);
          .catch(err => console.log(err));
      })
      </script>

</body>
</html>