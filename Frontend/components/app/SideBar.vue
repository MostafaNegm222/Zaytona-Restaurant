<template>
  <div
    class="sidebar bg-primary text-white h-[100vh] sticky top-0 hidden md:block overflow-hidden"
  >
    <div class="logo text-center py-[30px] px-0">
      <img
        src="../../assets/images/LOGO.png"
        alt="logo"
        class="w-20 md:w-35 mx-auto"
      >
    </div>

    <div class="flex flex-col h-[80vh] justify-between">
      <div>
        <ul class="second-nav list-none p-0 m-0">
          <li
            class="nav-item relative py-[15px] px-[25px] my-[8px] mx-[15px] rounded-[8px] cursor-pointer transition-[0.3s] whitespace-nowrap"
          >
            <nuxt-link to="/admin" class="inline-flex items-center gap-4">
              <svg
                class="text-[1.5em] mr-[20px]"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="25"
                height="25"
                x="0"
                y="0"
                viewBox="0 0 513.029 513.029"
                style="enable-background: new 0 0 512 512"
                xml:space="preserve"
              >
                <g>
                  <path
                    d="M148.684 65.029h220.331V20.015C369.015 8.611 359.677 0 349.046 0c-2.07 0-4.187.326-6.296 1.022zM409.015 95.029h-305c-11.046 0-20 8.954-20 20v378c0 11.046 8.954 20 20 20h305c11.046 0 20-8.954 20-20v-378c0-11.045-8.955-20-20-20zm-252.5 180.324h4.345c6.466-41.398 39.257-74.189 80.655-80.655v-7.516c0-8.284 6.716-15 15-15s15 6.716 15 15v7.516c41.398 6.466 74.189 39.257 80.655 80.655h4.345c8.284 0 15 6.716 15 15s-6.716 15-15 15h-200c-8.284 0-15-6.716-15-15s6.715-15 15-15zm92.817 85.524c0 8.284-6.716 15-15 15h-72c-8.284 0-15-6.716-15-15s6.716-15 15-15h72c8.284 0 15 6.716 15 15zm103.433 75h-192.5c-8.284 0-15-6.716-15-15s6.716-15 15-15h192.5c8.284 0 15 6.716 15 15s-6.716 15-15 15z"
                    fill="#FFFFFF"
                    opacity="1"
                    data-original="#000000"
                  />
                  <path
                    d="M321.636 275.353c-6.827-29.645-33.434-51.818-65.121-51.818s-58.294 22.174-65.121 51.818z"
                    fill="#FFFFFF"
                    opacity="1"
                    data-original="#000000"
                  />
                </g>
              </svg>
              <span
                class="text-[1.1em] font[500] opacity-[0.8] transition-[0.3s] hover:opacity-[1]"
                >Menu Items</span
              >
            </nuxt-link>
          </li>

          <li
            class="nav-item relative py-[15px] px-[25px] my-[8px] mx-[15px] rounded-[8px] cursor-pointer transition-[0.3s] whitespace-nowrap"
          >
            <nuxt-link to="/admin/Users" class="inline-flex items-center gap-4">
              <svg
                class="text-[1.5em] mr-[20px]"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="25"
                height="25"
                x="0"
                y="0"
                viewBox="0 0 23.625 23.625"
                style="enable-background: new 0 0 512 512"
                xml:space="preserve"
              >
                <g>
                  <path
                    d="M11.812 0C5.289 0 0 5.289 0 11.812s5.289 11.813 11.812 11.813 11.813-5.29 11.813-11.813S18.335 0 11.812 0zm2.459 18.307c-.608.24-1.092.422-1.455.548a3.838 3.838 0 0 1-1.262.189c-.736 0-1.309-.18-1.717-.539s-.611-.814-.611-1.367c0-.215.015-.435.045-.659a8.23 8.23 0 0 1 .147-.759l.761-2.688c.067-.258.125-.503.171-.731.046-.23.068-.441.068-.633 0-.342-.071-.582-.212-.717-.143-.135-.412-.201-.813-.201-.196 0-.398.029-.605.09-.205.063-.383.12-.529.176l.201-.828c.498-.203.975-.377 1.43-.521a4.225 4.225 0 0 1 1.29-.218c.731 0 1.295.178 1.692.53.395.353.594.812.594 1.376 0 .117-.014.323-.041.617a4.129 4.129 0 0 1-.152.811l-.757 2.68a7.582 7.582 0 0 0-.167.736 3.892 3.892 0 0 0-.073.626c0 .356.079.599.239.728.158.129.435.194.827.194.185 0 .392-.033.626-.097.232-.064.4-.121.506-.17l-.203.827zm-.134-10.878a1.807 1.807 0 0 1-1.275.492c-.496 0-.924-.164-1.28-.492a1.57 1.57 0 0 1-.533-1.193c0-.465.18-.865.533-1.196a1.812 1.812 0 0 1 1.28-.497c.497 0 .923.165 1.275.497.353.331.53.731.53 1.196 0 .467-.177.865-.53 1.193z"
                    style=""
                    fill="#FFFFFF"
                    data-original="#030104"
                    opacity="1"
                  />
                </g>
              </svg>
              <span
                class="text-[1.1em] font[500] opacity-[0.8] transition-[0.3s] hover:opacity-[1]"
                >Users Information</span
              >
            </nuxt-link>
          </li>

          <li
            class="nav-item relative py-[15px] px-[25px] my-[8px] mx-[15px] rounded-[8px] cursor-pointer transition-[0.3s] whitespace-nowrap"
          >
            <nuxt-link
              to="/admin/Tables"
              class="inline-flex items-center gap-4"
            >
              <svg
                class="text-[1.5em] mr-[20px]"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="25"
                height="25"
                x="0"
                y="0"
                viewBox="0 0 100 100"
                style="enable-background: new 0 0 512 512"
                xml:space="preserve"
              >
                <g>
                  <path
                    d="m99.364 45.59-7.897-15.592c-1.061-2.094-3.397-3.448-5.953-3.448H14.51c-2.555 0-4.892 1.354-5.953 3.448L.66 45.59c-.875 1.729-.793 3.673.226 5.332.813 1.323 2.147 2.281 3.694 2.739v34.066a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5v-12.23h5.427a1.5 1.5 0 0 0 1.5-1.5V60.255H79.52v13.742a1.5 1.5 0 0 0 1.5 1.5h5.427v12.23a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V53.661c1.547-.458 2.881-1.416 3.694-2.739 1.019-1.659 1.101-3.602.225-5.331zM11.233 31.354c.555-1.095 1.841-1.803 3.277-1.803h71.004c1.436 0 2.722.708 3.277 1.803l7.532 14.872H3.701l7.532-14.872zm6.273 41.142h-3V60.254h3zm68.013 0h-3V60.254h3zm6.927 13.73h-3V58.753a1.5 1.5 0 0 0-1.5-1.5H12.079a1.5 1.5 0 0 0-1.5 1.5v27.473h-3V54.253h84.866zm4.138-36.875c-.612.996-1.828 1.615-3.172 1.615H6.613c-1.344 0-2.56-.619-3.172-1.615-.023-.037-.047-.082-.07-.125h93.282l-.069.125z"
                    fill="#FFFFFF"
                    opacity="1"
                    data-original="#000000"
                    class=""
                  />
                </g>
              </svg>
              <span
                class="text-[1.1em] font[500] opacity-[0.8] transition-[0.3s] hover:opacity-[1]"
                >Tables Reservation</span
              >
            </nuxt-link>
          </li>
        </ul>
      </div>

      <div class="second-nav list-none p-0">
        <li
          class="nav-item relative py-[15px] px-[25px] my-[8px] mx-[15px] rounded-[8px] cursor-pointer transition-[0.3s] whitespace-nowrap"
        >
          <nuxt-link
            to="#"
            class="inline-flex items-center gap-4"
            @click="
              () => {
                auth.logout();
                console.log('logout');
              }
            "
          >
            <svg
              class="text-[1.5em] mr-[20px]"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="25"
              height="25"
              x="0"
              y="0"
              viewBox="0 0 512 512"
              style="enable-background: new 0 0 512 512"
              xml:space="preserve"
            >
              <g
                transform="matrix(-1,-1.2246467991473532e-16,1.2246467991473532e-16,-1,489.4744567871094,512)"
              >
                <switch>
                  <g>
                    <path
                      d="M475.2 333.2c-12.4-6-27.4-.7-33.4 11.7-16.6 34.5-42.4 63.7-74.7 84.5C334 450.7 295.6 462 256 462c-113.6 0-206-92.4-206-206S142.4 50 256 50c39.6 0 78 11.3 111.2 32.5 32.3 20.7 58.1 50 74.7 84.5 6 12.4 20.9 17.7 33.4 11.7 12.4-6 17.7-20.9 11.7-33.4-20.6-42.9-52.6-79.2-92.8-104.9C353 14 305.2 0 256 0 187.6 0 123.3 26.6 75 75 26.6 123.3 0 187.6 0 256s26.6 132.7 75 181c48.4 48.4 112.6 75 181 75 49.2 0 97-14 138.2-40.5 40.1-25.8 72.2-62.1 92.8-104.9 5.9-12.5.7-27.4-11.8-33.4z"
                      fill="#FFFFFF"
                      opacity="1"
                      data-original="#000000"
                    />
                    <path
                      d="M269.3 353.3c4.9 4.9 11.3 7.3 17.7 7.3s12.8-2.4 17.7-7.3l62.9-62.9c9.2-9.2 14.2-21.4 14.2-34.3s-5.1-25.2-14.2-34.3l-62.9-62.9c-9.8-9.8-25.6-9.8-35.4 0s-9.8 25.6 0 35.4l36.9 36.9H164.1c-13.8 0-25 11.2-25 25s11.2 25 25 25h142.2l-36.9 36.9c-9.8 9.6-9.8 25.4-.1 35.2z"
                      fill="#FFFFFF"
                      opacity="1"
                      data-original="#000000"
                    />
                  </g>
                </switch>
              </g>
            </svg>
            <span
              class="text-[1.1em] font[500] opacity-[0.8] transition-[0.3s] hover:opacity-[1]"
              >Log Out</span
            >
          </nuxt-link>
        </li>
      </div>
    </div>
  </div>

  <!-- //////////////////////////////////////////////// -->
  <UContainer class="w-full md:hidden py-4 bg-primary">
    <div class="flex justify-between items-center">
      <div>
        <img src="../../assets/images/LOGO.png" alt="logo" class="w-25" >
      </div>
      <div>
        <UDrawer direction="left">
          <UButton
            color="neutral"
            variant="subtle"
            trailing-icon="i-lucide-menu"
            class="bg-primary text-white hover:text-primary cursor-pointer border-none ring-0"
          />

          <template #content>
            <div
              class="min-w-90 min-h-96 size-full sidebar bg-primary text-white"
            >
              <div class="logo text-center py-[30px] px-0">
                <img
                  src="../../assets/images/LOGO.png"
                  alt="logo"
                  class="w-20 md:w-35 mx-auto"
                >
              </div>

              <div class="flex flex-col h-[80vh] justify-between items-center">
                <div>
                  <ul class="second-nav list-none p-0 m-0">
                    <li
                      class="nav-item relative py-[15px] px-[25px] my-[8px] mx-[15px] rounded-[8px] cursor-pointer transition-[0.3s] whitespace-nowrap"
                    >
                      <nuxt-link
                        to="/admin"
                        class="inline-flex items-center gap-4"
                      >
                        <svg
                          class="text-[1.5em] mr-[20px]"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          width="25"
                          height="25"
                          x="0"
                          y="0"
                          viewBox="0 0 513.029 513.029"
                          style="enable-background: new 0 0 512 512"
                          xml:space="preserve"
                        >
                          <g>
                            <path
                              d="M148.684 65.029h220.331V20.015C369.015 8.611 359.677 0 349.046 0c-2.07 0-4.187.326-6.296 1.022zM409.015 95.029h-305c-11.046 0-20 8.954-20 20v378c0 11.046 8.954 20 20 20h305c11.046 0 20-8.954 20-20v-378c0-11.045-8.955-20-20-20zm-252.5 180.324h4.345c6.466-41.398 39.257-74.189 80.655-80.655v-7.516c0-8.284 6.716-15 15-15s15 6.716 15 15v7.516c41.398 6.466 74.189 39.257 80.655 80.655h4.345c8.284 0 15 6.716 15 15s-6.716 15-15 15h-200c-8.284 0-15-6.716-15-15s6.715-15 15-15zm92.817 85.524c0 8.284-6.716 15-15 15h-72c-8.284 0-15-6.716-15-15s6.716-15 15-15h72c8.284 0 15 6.716 15 15zm103.433 75h-192.5c-8.284 0-15-6.716-15-15s6.716-15 15-15h192.5c8.284 0 15 6.716 15 15s-6.716 15-15 15z"
                              fill="#FFFFFF"
                              opacity="1"
                              data-original="#000000"
                            />
                            <path
                              d="M321.636 275.353c-6.827-29.645-33.434-51.818-65.121-51.818s-58.294 22.174-65.121 51.818z"
                              fill="#FFFFFF"
                              opacity="1"
                              data-original="#000000"
                            />
                          </g>
                        </svg>
                        <span
                          class="text-[1.6em] font[500] opacity-[0.8] transition-[0.3s] hover:opacity-[1]"
                          >Menu Items</span
                        >
                      </nuxt-link>
                    </li>

                    <li
                      class="nav-item relative py-[15px] px-[25px] my-[8px] mx-[15px] rounded-[8px] cursor-pointer transition-[0.3s] whitespace-nowrap"
                    >
                      <nuxt-link
                        to="/admin/Users"
                        class="inline-flex items-center gap-4"
                      >
                        <svg
                          class="text-[1.5em] mr-[20px]"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          width="25"
                          height="25"
                          x="0"
                          y="0"
                          viewBox="0 0 23.625 23.625"
                          style="enable-background: new 0 0 512 512"
                          xml:space="preserve"
                        >
                          <g>
                            <path
                              d="M11.812 0C5.289 0 0 5.289 0 11.812s5.289 11.813 11.812 11.813 11.813-5.29 11.813-11.813S18.335 0 11.812 0zm2.459 18.307c-.608.24-1.092.422-1.455.548a3.838 3.838 0 0 1-1.262.189c-.736 0-1.309-.18-1.717-.539s-.611-.814-.611-1.367c0-.215.015-.435.045-.659a8.23 8.23 0 0 1 .147-.759l.761-2.688c.067-.258.125-.503.171-.731.046-.23.068-.441.068-.633 0-.342-.071-.582-.212-.717-.143-.135-.412-.201-.813-.201-.196 0-.398.029-.605.09-.205.063-.383.12-.529.176l.201-.828c.498-.203.975-.377 1.43-.521a4.225 4.225 0 0 1 1.29-.218c.731 0 1.295.178 1.692.53.395.353.594.812.594 1.376 0 .117-.014.323-.041.617a4.129 4.129 0 0 1-.152.811l-.757 2.68a7.582 7.582 0 0 0-.167.736 3.892 3.892 0 0 0-.073.626c0 .356.079.599.239.728.158.129.435.194.827.194.185 0 .392-.033.626-.097.232-.064.4-.121.506-.17l-.203.827zm-.134-10.878a1.807 1.807 0 0 1-1.275.492c-.496 0-.924-.164-1.28-.492a1.57 1.57 0 0 1-.533-1.193c0-.465.18-.865.533-1.196a1.812 1.812 0 0 1 1.28-.497c.497 0 .923.165 1.275.497.353.331.53.731.53 1.196 0 .467-.177.865-.53 1.193z"
                              style=""
                              fill="#FFFFFF"
                              data-original="#030104"
                              opacity="1"
                            />
                          </g>
                        </svg>
                        <span
                          class="text-[1.6em] font[500] opacity-[0.8] transition-[0.3s] hover:opacity-[1]"
                          >Users Information</span
                        >
                      </nuxt-link>
                    </li>

                    <li
                      class="nav-item relative py-[15px] px-[25px] my-[8px] mx-[15px] rounded-[8px] cursor-pointer transition-[0.3s] whitespace-nowrap"
                    >
                      <nuxt-link
                        to="/admin/Tables"
                        class="inline-flex items-center gap-4"
                      >
                        <svg
                          class="text-[1.5em] mr-[20px]"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          width="25"
                          height="25"
                          x="0"
                          y="0"
                          viewBox="0 0 100 100"
                          style="enable-background: new 0 0 512 512"
                          xml:space="preserve"
                        >
                          <g>
                            <path
                              d="m99.364 45.59-7.897-15.592c-1.061-2.094-3.397-3.448-5.953-3.448H14.51c-2.555 0-4.892 1.354-5.953 3.448L.66 45.59c-.875 1.729-.793 3.673.226 5.332.813 1.323 2.147 2.281 3.694 2.739v34.066a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5v-12.23h5.427a1.5 1.5 0 0 0 1.5-1.5V60.255H79.52v13.742a1.5 1.5 0 0 0 1.5 1.5h5.427v12.23a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V53.661c1.547-.458 2.881-1.416 3.694-2.739 1.019-1.659 1.101-3.602.225-5.331zM11.233 31.354c.555-1.095 1.841-1.803 3.277-1.803h71.004c1.436 0 2.722.708 3.277 1.803l7.532 14.872H3.701l7.532-14.872zm6.273 41.142h-3V60.254h3zm68.013 0h-3V60.254h3zm6.927 13.73h-3V58.753a1.5 1.5 0 0 0-1.5-1.5H12.079a1.5 1.5 0 0 0-1.5 1.5v27.473h-3V54.253h84.866zm4.138-36.875c-.612.996-1.828 1.615-3.172 1.615H6.613c-1.344 0-2.56-.619-3.172-1.615-.023-.037-.047-.082-.07-.125h93.282l-.069.125z"
                              fill="#FFFFFF"
                              opacity="1"
                              data-original="#000000"
                              class=""
                            />
                          </g>
                        </svg>
                        <span
                          class="text-[1.6em] font[500] opacity-[0.8] transition-[0.3s] hover:opacity-[1]"
                          >Tables Reservation</span
                        >
                      </nuxt-link>
                    </li>
                  </ul>
                </div>
                <div class="second-nav list-none p-0">
                  <li
                    class="nav-item relative py-[15px] px-[25px] my-[8px] mx-[15px] rounded-[8px] cursor-pointer transition-[0.3s] whitespace-nowrap"
                  >
                    <nuxt-link
                      to="#"
                      class="inline-flex items-center gap-4"
                      @click="
                        () => {
                          auth.logout();
                          console.log('logout');
                        }
                      "
                    >
                      <svg
                        class="text-[1.5em] mr-[20px]"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="25"
                        height="25"
                        x="0"
                        y="0"
                        viewBox="0 0 512 512"
                        style="enable-background: new 0 0 512 512"
                        xml:space="preserve"
                      >
                        <g
                          transform="matrix(-1,-1.2246467991473532e-16,1.2246467991473532e-16,-1,489.4744567871094,512)"
                        >
                          <switch>
                            <g>
                              <path
                                d="M475.2 333.2c-12.4-6-27.4-.7-33.4 11.7-16.6 34.5-42.4 63.7-74.7 84.5C334 450.7 295.6 462 256 462c-113.6 0-206-92.4-206-206S142.4 50 256 50c39.6 0 78 11.3 111.2 32.5 32.3 20.7 58.1 50 74.7 84.5 6 12.4 20.9 17.7 33.4 11.7 12.4-6 17.7-20.9 11.7-33.4-20.6-42.9-52.6-79.2-92.8-104.9C353 14 305.2 0 256 0 187.6 0 123.3 26.6 75 75 26.6 123.3 0 187.6 0 256s26.6 132.7 75 181c48.4 48.4 112.6 75 181 75 49.2 0 97-14 138.2-40.5 40.1-25.8 72.2-62.1 92.8-104.9 5.9-12.5.7-27.4-11.8-33.4z"
                                fill="#FFFFFF"
                                opacity="1"
                                data-original="#000000"
                              />
                              <path
                                d="M269.3 353.3c4.9 4.9 11.3 7.3 17.7 7.3s12.8-2.4 17.7-7.3l62.9-62.9c9.2-9.2 14.2-21.4 14.2-34.3s-5.1-25.2-14.2-34.3l-62.9-62.9c-9.8-9.8-25.6-9.8-35.4 0s-9.8 25.6 0 35.4l36.9 36.9H164.1c-13.8 0-25 11.2-25 25s11.2 25 25 25h142.2l-36.9 36.9c-9.8 9.6-9.8 25.4-.1 35.2z"
                                fill="#FFFFFF"
                                opacity="1"
                                data-original="#000000"
                              />
                            </g>
                          </switch>
                        </g>
                      </svg>
                      <span
                        class="text-[1.6em] font[500] opacity-[0.8] transition-[0.3s] hover:opacity-[1]"
                        >Log Out</span
                      >
                    </nuxt-link>
                  </li>
                </div>
              </div>
            </div>
          </template>
        </UDrawer>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
const auth = useAuth();
console.log(auth.logout);
</script>

<style scoped>
.sidebar {
  backdrop-filter: blur(15px);
  transition: 0.5s;
}

.logo {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(10px);
}

.nav-item:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 3px;
  height: 100%;
  background: #fff;
  transform: scaleY(0);
  transition: transform 0.3s;
}

.nav-item:hover:before {
  transform: scaleY(1);
}

.nav-item .router-link-exact-active span {
  font-weight: bold;
  opacity: 1 !important;
}

.nav-item .router-link-exact-active span {
  font-weight: bold;
  opacity: 1 !important;
}
</style>
