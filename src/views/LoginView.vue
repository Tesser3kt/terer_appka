<script setup></script>
<template>
  <main>
    <div class="login-form-wrapper min-vh-100 d-flex justify-content-center align-items-center">
      <div class="container">
        <div class="row gy-3">
          <div class="col-12">
            <h1 class="text-primary-emphasis text-center">Login</h1>
          </div>
          <div class="col-12">
            <div class="form-wrapper">
              <form>
                <div class="mb-3">
                  <label for="userName" class="form-label">Přihlašovací jméno</label>
                  <input
                    type="email"
                    class="form-control"
                    id="userName"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Heslo</label>
                  <input type="password" class="form-control" id="password" />
                </div>
                <button type="submit" class="btn btn-primary">Přihlásit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
