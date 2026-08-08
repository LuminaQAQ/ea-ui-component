<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(async () => {
  await customElements.whenDefined("ea-upload");

  // 模拟 $confirm 对话框
  window.$confirm = (msg) => {
    return new Promise((resolve, reject) => {
      if (window.confirm(msg)) {
        resolve(true);
      } else {
        reject(new Error("cancel"));
      }
    });
  };

  // ------- 基础用法 -------
  // #region
  const basicUpload = document.getElementById("basicUpload");
  if (basicUpload) {
    basicUpload.defaultFileList = [
      {
        uid: "1",
        name: "test.txt",
        status: "uploading",
        url: "http://example.com/test.txt",
        percent: 33,
      },
      {
        uid: "2",
        name: "test.txt",
        status: "done",
        url: "http://example.com/test.txt",
      },
      {
        uid: "3",
        name: "test.txt",
        status: "error",
        response: "404 Not Found",
        url: "http://example.com/test.txt",
      },
    ];

    basicUpload.addEventListener("change", (e) => {
      console.log(e, e.detail, e.target.fileList);
    });
    basicUpload.onRemove = (file, fileList) => {
      console.log(file, fileList);
    };
    basicUpload.beforeRemove = (file, fileList) => {
      return window.$confirm(`Cancel the transfer of ${file.name} ?`);
    };
  }
  // #endregion
  // ------- end -------

  // ------- 覆盖前一个文件 -------
  // #region
  const limitUpload = document.getElementById("limitUpload");
  if (limitUpload) {
    limitUpload.onExceed = async (files, uploadFiles) => {
      try {
        await window.$confirm(
          "You can only upload up to 1 file. Replace the existing file?"
        );
        return true;
      } catch {
        return false;
      }
    };
  }
  // #endregion
  // ------- end -------

  // ------- 照片墙 -------
  // #region
  const pictureCardUpload = document.getElementById("pictureCardUpload");
  if (pictureCardUpload) {
    pictureCardUpload.defaultFileList = [
      {
        uid: "1",
        name: "test.txt",
        status: "uploading",
        url: "http://example.com/test.txt",
        percent: 33,
      },
      {
        uid: "2",
        name: "test.txt",
        status: "done",
        url: "http://example.com/test.txt",
      },
      {
        uid: "3",
        name: "test.txt",
        status: "error",
        response: "404 Not Found",
        url: "http://example.com/test.txt",
      },
    ];

    pictureCardUpload.addEventListener("change", (e) => {
      console.log(e, e.detail, e.target.fileList);
    });
    pictureCardUpload.onRemove = (file, fileList) => {
      console.log(file, fileList);
    };
    pictureCardUpload.beforeRemove = (file, fileList) => {
      return window.$confirm(`Cancel the transfer of ${file.name} ?`);
    };
  }
  // #endregion
  // ------- end -------

  // ------- 自定义缩略图 -------
  // #region
  const avatarUpload = document.getElementById("avatarUpload");
  const avatarImage = document.getElementById("avatarImage");
  const avatarPlaceholder = document.getElementById("avatarPlaceholder");
  if (avatarUpload) {
    avatarUpload.beforeUpload = (uploadFile) => {
      const rawFile = uploadFile.raw;
      if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
        alert("Avatar picture must be JPG or PNG format!");
        return false;
      } else if (rawFile.size / 1024 / 1024 > 2) {
        alert("Avatar picture size can not exceed 2MB!");
        return false;
      }
      return true;
    };
    avatarUpload.onSuccess = (response, uploadFile) => {
      if (avatarImage) {
        avatarImage.src = URL.createObjectURL(uploadFile.raw);
        avatarImage.style.display = "block";
      }
      if (avatarPlaceholder) {
        avatarPlaceholder.style.display = "none";
      }
    };
  }
  // #endregion
  // ------- end -------

  // ------- 图片列表缩略图 -------
  // #region
  const pictureUpload = document.getElementById("pictureUpload");
  if (pictureUpload) {
    pictureUpload.defaultFileList = [
      {
        uid: "1",
        name: "test.txt",
        status: "uploading",
        url: "http://example.com/test.txt",
        percent: 33,
      },
      {
        uid: "2",
        name: "test.txt",
        status: "done",
        url: "http://example.com/test.txt",
      },
      {
        uid: "3",
        name: "test.txt",
        status: "error",
        response: "404 Not Found",
        url: "http://example.com/test.txt",
      },
    ];

    pictureUpload.addEventListener("change", (e) => {
      console.log(e, e.detail, e.target.fileList);
    });
    pictureUpload.onRemove = (file, fileList) => {
      console.log(file, fileList);
    };
    pictureUpload.beforeRemove = (file, fileList) => {
      return window.$confirm(`Cancel the transfer of ${file.name} ?`);
    };
  }
  // #endregion
  // ------- end -------

  // ------- 上传文件列表控制 -------
  // #region
  const listControlUpload = document.getElementById("listControlUpload");
  if (listControlUpload) {
    listControlUpload.defaultFileList = [
      {
        name: "food.jpeg",
        url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
      },
      {
        name: "food2.jpeg",
        url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
      },
    ];
    listControlUpload.onChange = (uploadFile, uploadFiles) => {
      listControlUpload.fileList = uploadFiles.slice(-3);
    };
  }
  // #endregion
  // ------- end -------

  // ------- 拖拽上传 -------
  // #region
  const dragUpload = document.getElementById("dragUpload");
  if (dragUpload) {
    dragUpload.onChange = (uploadFile, uploadFiles) => {
      console.log(uploadFile, uploadFiles);
    };
  }
  // #endregion
  // ------- end -------

  // ------- 上传目录 -------
  // #region
  const directoryUpload = document.getElementById("directoryUpload");
  if (directoryUpload) {
    directoryUpload.onChange = (uploadFile, uploadFiles) => {
      console.log(uploadFile, uploadFiles);
    };
  }
  // #endregion
  // ------- end -------

  // ------- 手动上传 -------
  // #region
  const manualUpload = document.getElementById("manualUpload");
  const submitBtn = document.getElementById("submitBtn");
  if (manualUpload) {
    manualUpload.defaultFileList = [
      {
        uid: "1",
        name: "test.txt",
        status: "uploading",
        url: "http://example.com/test.txt",
        percent: 33,
      },
      {
        uid: "2",
        name: "test.txt",
        status: "done",
        url: "http://example.com/test.txt",
      },
      {
        uid: "3",
        name: "test.txt",
        status: "error",
        response: "404 Not Found",
        url: "http://example.com/test.txt",
      },
    ];
  }
  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      manualUpload?.submit();
    });
  }
  // #endregion
  // ------- end -------
});
</script>

<style>
.tip {
  color: #909399;
  font-size: 12px;
  margin: 4px;
}

.upload-dragger .ea-upload__icon {
  font-size: 48px;
  color: var(--grey-400);
  margin-bottom: var(--spacing-sm);
}

.avatar-uploader .avatar-uploader__trigger {
  border: 1px dashed var(--grey-300);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color var(--transition-fast);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 178px;
  height: 178px;
}

.avatar-uploader .avatar-uploader__trigger:hover {
  border-color: var(--primary-color);
}

.avatar-uploader .avatar-uploader__icon {
  font-size: 28px;
  color: #8c939d;
}

.avatar-uploader .avatar-uploader__image {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: cover;
}
</style>

# Upload 上传

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-upload.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-upload";
```

:::

## 自定义样式

移步到 [Upload CSS Part](#upload-css-part) 和 [Upload CSS Custom Properties](#upload-css-custom-properties)。

## 基础用法

基础的文件上传用法，支持文件列表展示、上传进度、删除确认等功能。

<div class="demo">
<ea-upload id="basicUpload" class="upload-demo" action="https://m1.apifoxmock.com/m1/8609267-8388194-default/file" multiple>
  <ea-button type="primary">Click to upload</ea-button>
  <div class="tip" slot="tip">jpg/png files with a size less than 500KB.</div>
</ea-upload>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-upload
    id="basicUpload"
    class="upload-demo"
    action="https://m1.apifoxmock.com/m1/8609267-8388194-default/file"
    multiple
  >
    <ea-button type="primary">Click to upload</ea-button>
    <div class="tip" slot="tip">jpg/png files with a size less than 500KB.</div>
  </ea-upload>
</div>
```

```js
const basicUpload = document.getElementById("basicUpload");
basicUpload.defaultFileList = [
  {
    uid: "1",
    name: "test.txt",
    status: "uploading",
    url: "http://example.com/test.txt",
    percent: 33,
  },
  {
    uid: "2",
    name: "test.txt",
    status: "done",
    url: "http://example.com/test.txt",
  },
  {
    uid: "3",
    name: "test.txt",
    status: "error",
    response: "404 Not Found",
    url: "http://example.com/test.txt",
  },
];

basicUpload.addEventListener("change", e => {
  console.log(e, e.detail, e.target.fileList);
});
basicUpload.onRemove = (file, fileList) => {
  console.log(file, fileList);
};
basicUpload.beforeRemove = (file, fileList) => {
  return window.$confirm(`Cancel the transfer of ${file.name} ?`);
};
```

:::

::::

## 覆盖前一个文件

通过 `limit` 属性和 `onExceed` 回调，限制上传文件数量，并在超出时提示用户替换已有文件。

<div class="demo">
<ea-upload id="limitUpload" class="upload-demo" action="https://m1.apifoxmock.com/m1/8609267-8388194-default/file" limit="1">
  <ea-button type="primary">Click to upload</ea-button>
  <div class="tip" slot="tip">Only one file can be uploaded at a time.</div>
</ea-upload>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-upload
    id="limitUpload"
    class="upload-demo"
    action="https://m1.apifoxmock.com/m1/8609267-8388194-default/file"
    limit="1"
  >
    <ea-button type="primary">Click to upload</ea-button>
    <div class="tip" slot="tip">Only one file can be uploaded at a time.</div>
  </ea-upload>
</div>
```

```js
const limitUpload = document.getElementById("limitUpload");
limitUpload.onExceed = async (files, uploadFiles) => {
  try {
    await window.$confirm(
      "You can only upload up to 1 file. Replace the existing file?"
    );
    return true;
  } catch {
    return false;
  }
};
```

:::

::::

## 照片墙

使用 `list-type="picture-card"` 实现照片墙展示效果，支持图片预览、删除等操作。

<div class="demo">
<ea-upload id="pictureCardUpload" action="https://m1.apifoxmock.com/m1/8609267-8388194-default/file" list-type="picture-card">
  <ea-icon name="plus"></ea-icon>
</ea-upload>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-upload
    id="pictureCardUpload"
    action="https://m1.apifoxmock.com/m1/8609267-8388194-default/file"
    list-type="picture-card"
  >
    <ea-icon name="plus"></ea-icon>
  </ea-upload>
</div>
```

```js
const pictureUpload = document.getElementById("pictureCardUpload");
pictureUpload.defaultFileList = [
  {
    uid: "1",
    name: "test.txt",
    status: "uploading",
    url: "http://example.com/test.txt",
    percent: 33,
  },
  {
    uid: "2",
    name: "test.txt",
    status: "done",
    url: "http://example.com/test.txt",
  },
  {
    uid: "3",
    name: "test.txt",
    status: "error",
    response: "404 Not Found",
    url: "http://example.com/test.txt",
  },
];

pictureUpload.addEventListener("change", e => {
  console.log(e, e.detail, e.target.fileList);
});
pictureUpload.onRemove = (file, fileList) => {
  console.log(file, fileList);
};
pictureUpload.beforeRemove = (file, fileList) => {
  return window.$confirm(`Cancel the transfer of ${file.name} ?`);
};
```

:::

::::

## 自定义缩略图

设置 `show-file-list="false"` 隐藏默认文件列表，通过 `beforeUpload` 和 `onSuccess` 回调自定义上传逻辑和缩略图展示。

<div class="demo avatar-uploader">
<ea-upload id="avatarUpload" class="avatar-uploader" action="https://m1.apifoxmock.com/m1/8609267-8388194-default/file" show-file-list="false">
  <img id="avatarImage" class="avatar-uploader__image" style="display: none" />
  <div id="avatarPlaceholder" class="avatar-uploader__trigger">
    <span class="avatar-uploader__icon">+</span>
  </div>
</ea-upload>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo avatar-uploader">
  <ea-upload
    id="avatarUpload"
    class="upload-demo"
    action="https://m1.apifoxmock.com/m1/8609267-8388194-default/file"
    show-file-list="false"
  >
    <img
      id="avatarImage"
      class="avatar-uploader__image"
      style="display: none"
    />
    <div id="avatarPlaceholder" class="avatar-uploader__trigger">
      <span class="avatar-uploader__icon">+</span>
    </div>
  </ea-upload>
</div>
```

```css
.avatar-uploader .avatar-uploader__trigger {
  border: 1px dashed var(--grey-300);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color var(--transition-fast);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 178px;
  height: 178px;
}

.avatar-uploader .avatar-uploader__trigger:hover {
  border-color: var(--primary-color);
}

.avatar-uploader .avatar-uploader__icon {
  font-size: 28px;
  color: #8c939d;
}

.avatar-uploader .avatar-uploader__image {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: cover;
}
```

```js
const avatarUpload = document.getElementById("avatarUpload");
const avatarImage = document.getElementById("avatarImage");
const avatarPlaceholder = document.getElementById("avatarPlaceholder");

avatarUpload.beforeUpload = uploadFile => {
  const rawFile = uploadFile.raw;
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    alert("Avatar picture must be JPG or PNG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    alert("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

avatarUpload.onSuccess = (response, uploadFile) => {
  avatarImage.src = URL.createObjectURL(uploadFile.raw);
  avatarImage.style.display = "block";
  avatarPlaceholder.style.display = "none";
};
```

:::

::::

## 图片列表缩略图

使用 `list-type="picture"` 以图片列表形式展示文件，文件名旁显示缩略图。

<div class="demo">
<ea-upload id="pictureUpload" class="upload-demo" action="https://m1.apifoxmock.com/m1/8609267-8388194-default/file" list-type="picture">
  <ea-button type="primary">Click to upload</ea-button>
  <div class="tip" slot="tip">jpg/png files with a size less than 500KB.</div>
</ea-upload>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-upload
    id="pictureUpload"
    class="upload-demo"
    action="https://m1.apifoxmock.com/m1/8609267-8388194-default/file"
    list-type="picture"
  >
    <ea-button type="primary">Click to upload</ea-button>
    <div class="tip" slot="tip">jpg/png files with a size less than 500KB.</div>
  </ea-upload>
</div>
```

```js
const pictureUpload = document.getElementById("pictureUpload");
pictureUpload.defaultFileList = [
  {
    uid: "1",
    name: "test.txt",
    status: "uploading",
    url: "http://example.com/test.txt",
    percent: 33,
  },
  {
    uid: "2",
    name: "test.txt",
    status: "done",
    url: "http://example.com/test.txt",
  },
  {
    uid: "3",
    name: "test.txt",
    status: "error",
    response: "404 Not Found",
    url: "http://example.com/test.txt",
  },
];

pictureUpload.addEventListener("change", e => {
  console.log(e, e.detail, e.target.fileList);
});
pictureUpload.onRemove = (file, fileList) => {
  console.log(file, fileList);
};
pictureUpload.beforeRemove = (file, fileList) => {
  return window.$confirm(`Cancel the transfer of ${file.name} ?`);
};
```

:::

::::

## 上传文件列表控制

通过 `onChange` 回调控制文件列表，如仅保留最新上传的 3 个文件。

<div class="demo">
    <ea-upload id="listControlUpload" class="upload-demo" action="https://m1.apifoxmock.com/m1/8609267-8388194-default/file">
    <ea-button type="primary">Click to upload</ea-button>
    <div class="tip" slot="tip">jpg/png files with a size less than 500KB, only the latest 3 files are kept.</div>
    </ea-upload>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-upload
    id="listControlUpload"
    class="upload-demo"
    action="https://m1.apifoxmock.com/m1/8609267-8388194-default/file"
  >
    <ea-button type="primary">Click to upload</ea-button>
    <div class="tip" slot="tip">
      jpg/png files with a size less than 500KB, only the latest 3 files are
      kept.
    </div>
  </ea-upload>
</div>
```

```js
const listControlUpload = document.getElementById("listControlUpload");
listControlUpload.defaultFileList = [
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
  {
    name: "food2.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
];
listControlUpload.onChange = (uploadFile, uploadFiles) => {
  listControlUpload.fileList = uploadFiles.slice(-3);
};
```

:::

::::

## 拖拽上传

通过 `drag` 属性启用拖拽上传，支持将文件拖拽到指定区域进行上传。

<div class="demo upload-dragger">
<ea-upload id="dragUpload" class="upload-demo" action="https://m1.apifoxmock.com/m1/8609267-8388194-default/file" drag multiple>
  <ea-icon name="upload"></ea-icon>
  <div class="ea-upload__text">
    Drop file here or <em>click to upload</em>
  </div>
</ea-upload>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo upload-dragger">
  <ea-upload
    id="dragUpload"
    class="upload-demo"
    action="https://m1.apifoxmock.com/m1/8609267-8388194-default/file"
    drag
    multiple
  >
    <ea-icon name="upload"></ea-icon>
    <div class="ea-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
  </ea-upload>
</div>
```

```css
.upload-dragger .ea-upload__icon {
  font-size: 48px;
  color: var(--grey-400);
  margin-bottom: var(--spacing-sm);
}
```

```js
const dragUpload = document.getElementById("dragUpload");
dragUpload.onChange = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};
```

:::

::::

## 上传目录

通过 `directory` 属性支持上传整个目录结构，配合 `drag` 属性使用。

<div class="demo">
<ea-upload id="directoryUpload" class="upload-demo" action="https://m1.apifoxmock.com/m1/8609267-8388194-default/file" drag directory multiple>
  <ea-icon name="upload"></ea-icon>
  <div class="ea-upload__text">
    Drop directory here or <em>click to upload</em>
  </div>
</ea-upload>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-upload
    id="directoryUpload"
    class="upload-demo"
    action="https://m1.apifoxmock.com/m1/8609267-8388194-default/file"
    drag
    directory
    multiple
  >
    <ea-icon name="upload"></ea-icon>
    <div class="ea-upload__text">
      Drop directory here or <em>click to upload</em>
    </div>
  </ea-upload>
</div>
```

```js
const directoryUpload = document.getElementById("directoryUpload");
directoryUpload.onChange = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};
```

:::

::::

## 手动上传

设置 `auto-upload="false"` 关闭自动上传，通过 `submit()` 方法手动触发上传。使用 `slot="trigger"` 自定义上传触发按钮。

<div class="demo">
<ea-upload id="manualUpload" class="upload-demo" action="https://m1.apifoxmock.com/m1/8609267-8388194-default/file" auto-upload="false">
  <ea-button type="primary" slot="trigger">select file</ea-button>
  <ea-button type="success" id="submitBtn">upload to server</ea-button>
  <div class="tip" slot="tip">jpg/png files with a size less than 500KB.</div>
</ea-upload>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-upload
    id="manualUpload"
    class="upload-demo"
    action="https://m1.apifoxmock.com/m1/8609267-8388194-default/file"
    auto-upload="false"
  >
    <ea-button type="primary" slot="trigger">select file</ea-button>
    <ea-button type="success" id="submitBtn">upload to server</ea-button>
    <div class="tip" slot="tip">jpg/png files with a size less than 500KB.</div>
  </ea-upload>
</div>
```

```js
const manualUpload = document.getElementById("manualUpload");
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", () => {
  manualUpload.submit();
});

manualUpload.defaultFileList = [
  {
    uid: "1",
    name: "test.txt",
    status: "uploading",
    url: "http://example.com/test.txt",
    percent: 33,
  },
  {
    uid: "2",
    name: "test.txt",
    status: "done",
    url: "http://example.com/test.txt",
  },
  {
    uid: "3",
    name: "test.txt",
    status: "error",
    response: "404 Not Found",
    url: "http://example.com/test.txt",
  },
];
```

:::

::::

## Upload API

### Upload Attributes

| Name             | Description        | Type    | Options                            | Default                 |
| ---------------- | ------------------ | ------- | ---------------------------------- | ----------------------- |
| action           | 上传请求地址       | String  | -                                  | ""                      |
| method           | 上传请求方法       | String  | `GET / POST / PUT / DELETE`        | POST                    |
| multiple         | 是否支持多文件上传 | Boolean | -                                  | false                   |
| name             | 上传文件字段名     | String  | -                                  | ""                      |
| with-credentials | 是否携带 cookie    | Boolean | -                                  | false                   |
| show-file-list   | 是否显示文件列表   | Boolean | -                                  | true                    |
| accept           | 接受的文件类型     | String  | -                                  | ""                      |
| crossorigin      | CORS 属性设置      | String  | `"" / anonymous / use-credentials` | ""                      |
| list-type        | 文件列表类型       | String  | `text / picture / picture-card`    | text                    |
| auto-upload      | 是否自动上传       | Boolean | -                                  | true                    |
| drag             | 是否启用拖拽上传   | Boolean | -                                  | false                   |
| limit            | 最大上传文件数量   | Number  | -                                  | Number.MAX_SAFE_INTEGER |
| directory        | 是否支持上传目录   | Boolean | -                                  | false                   |
| disabled         | 是否禁用上传       | Boolean | -                                  | false                   |

### Upload Properties

> Properties 为纯 JavaScript 属性，不映射到 HTML attribute，需通过 JS 访问。

| Name            | Description                                                  | Type                | Default             |
| --------------- | ------------------------------------------------------------ | ------------------- | ------------------- |
| data            | 上传时附带的额外参数                                         | Object              | {}                  |
| headers         | 上传请求头                                                   | Object              | {}                  |
| fileList        | 当前上传文件列表                                             | `FileItem[]`        | []                  |
| defaultFileList | 默认文件列表（初始化时展示已存在的文件）                     | `DefaultFileItem[]` | []                  |
| httpRequest     | 自定义上传请求方法                                           | Function            | createUploadRequest |
| beforeUpload    | 上传前的钩子函数，返回 `false` 或 Promise 拒绝时取消上传     | Function            | -                   |
| beforeRemove    | 移除文件前的钩子函数，返回 `false` 或 Promise 拒绝时取消移除 | Function            | -                   |
| onExceed        | 文件数量超出 `limit` 时的回调                                | Function            | -                   |
| onChange        | 文件列表变化时回调                                           | Function            | -                   |
| onRemove        | 文件被移除时回调                                             | Function            | -                   |
| onSuccess       | 上传成功时回调                                               | Function            | -                   |
| onError         | 上传失败时回调                                               | Function            | -                   |
| onProgress      | 上传进度更新时回调                                           | Function            | -                   |

**FileItem 类型定义：**

```typescript
interface FileItem {
  uid: string;
  name: string;
  status: "pending" | "uploading" | "done" | "error" | "removed";
  percent?: number;
  url?: string;
  thumbUrl?: string;
  response?: any;
  crossOrigin?: Crossorigin;
  raw?: File;
  controller?: UploadRequestResult;
}
```

**回调函数签名：**

```typescript
type beforeUpload = (
  uploadFile: FileItem,
  uploadFiles: FileItem[]
) => boolean | Promise<boolean>;
type beforeRemove = (
  uploadFile: FileItem,
  uploadFiles: FileItem[]
) => boolean | Promise<boolean>;
type onExceed = (
  files: File[],
  uploadFiles: FileItem[]
) => boolean | Promise<boolean>;
type onChange = (
  uploadFile: FileItem | undefined,
  uploadFiles: FileItem[]
) => void;
type onRemove = (uploadFile: FileItem, uploadFiles: FileItem[]) => void;
type onSuccess = (
  response: any,
  uploadFile: FileItem | FileItem[],
  uploadFiles: FileItem[]
) => void;
type onError = (
  error: Error,
  uploadFile: FileItem | FileItem[],
  uploadFiles: FileItem[]
) => void;
type onProgress = (
  event: ProgressEvent,
  uploadFile: FileItem | FileItem[],
  uploadFiles: FileItem[]
) => void;
```

### Upload Methods

| Name             | Description                               | Parameters               |
| ---------------- | ----------------------------------------- | ------------------------ |
| submit           | 提交上传，上传所有状态为 `pending` 的文件 | `() => Promise<void>`    |
| abort            | 中止上传，若提供 `uid` 则只中止该文件     | `(uid?: string) => void` |
| clearFiles       | 清空文件列表                              | `() => void`             |
| handleFileSelect | 触发文件选择对话框                        | `() => void`             |

### Upload Events

| Name               | Description        | Detail                                                                                      |
| ------------------ | ------------------ | ------------------------------------------------------------------------------------------- |
| change             | 文件列表变化时触发 | `{ uploadFile: FileItem \| undefined, uploadFiles: FileItem[] }`                            |
| ea-upload-remove   | 文件被移除时触发   | `{ uploadFile: FileItem, uploadFiles: FileItem[] }`                                         |
| ea-upload-error    | 上传请求失败时触发 | `{ error: EaUploadAjaxError, uploadFile: FileItem \| FileItem[], uploadFiles: FileItem[] }` |
| ea-upload-progress | 上传进度更新时触发 | `{ event: ProgressEvent, uploadFile: FileItem \| FileItem[], uploadFiles: FileItem[] }`     |
| ea-upload-success  | 上传成功时触发     | `{ response: any, uploadFile: FileItem \| FileItem[], uploadFiles: FileItem[] }`            |

### Upload CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| Name      | Description                          |
| --------- | ------------------------------------ |
| container | 容器                                 |
| content   | 上传触发区域容器                     |
| tip       | 提示信息区域                         |
| list      | 文件列表                             |
| trigger   | 上传按钮容器（仅 picture-card 模式） |
| file-item | 文件列表项                           |
| preview   | 图片预览组件                         |

### Upload CSS Custom Properties

| Name                              | Description                            | Default                  |
| --------------------------------- | -------------------------------------- | ------------------------ |
| --ea-upload-border-radius         | 组件圆角                               | var(--border-radius-sm)  |
| --ea-upload-font-size             | 组件字体大小                           | var(--font-size-md)      |
| --ea-upload-transition            | 组件过渡动画                           | var(--transition-fast)   |
| --ea-upload-text                  | 组件文字颜色                           | var(--grey-900)          |
| --ea-upload-bg                    | 组件背景色                             | var(--color-white)       |
| --ea-upload-border-color          | 组件边框颜色                           | var(--grey-300)          |
| --ea-upload-tip-color             | 提示文字颜色                           | var(--grey-500)          |
| --ea-upload-tip-font-size         | 提示文字字体大小                       | var(--font-size-sm)      |
| --ea-upload-trigger-width         | 上传触发器宽度（仅 picture-card 模式） | 148px                    |
| --ea-upload-trigger-height        | 上传触发器高度（仅 picture-card 模式） | 148px                    |
| --ea-upload-drag-bg               | 拖拽区域背景色                         | rgba(64, 158, 255, 0.05) |
| --ea-upload-drag-icon-size        | 拖拽区域图标大小                       | 48px                     |
| --ea-upload-drag-icon-color       | 拖拽区域图标颜色                       | var(--grey-400)          |
| --ea-upload-drag-icon-color-hover | 拖拽区域图标悬浮颜色                   | var(--primary-color)     |

### Upload Slots

| Name    | Description                        |
| ------- | ---------------------------------- |
| default | 默认插槽，上传按钮区域内容         |
| trigger | 触发按钮插槽，覆盖默认的上传触发器 |
| tip     | 提示信息插槽，显示在文件列表上方   |

## UploadFileItem API

### UploadFileItem Attributes

| Name      | Description  | Type   | Options                         | Default |
| --------- | ------------ | ------ | ------------------------------- | ------- |
| list-type | 文件列表类型 | String | `text / picture / picture-card` | text    |

### UploadFileItem Properties

> Properties 为纯 JavaScript 属性，不映射到 HTML attribute，需通过 JS 访问。

| Name | Description | Type               | Default |
| ---- | ----------- | ------------------ | ------- |
| item | 文件项数据  | `FileItem \| null` | null    |

### UploadFileItem Events

| Name                   | Description    | Detail            |
| ---------------------- | -------------- | ----------------- |
| ea-upload-file-delete  | 删除文件时触发 | `{ uid: string }` |
| ea-upload-file-preview | 预览文件时触发 | `{ uid: string }` |

### UploadFileItem CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| Name              | Description                            |
| ----------------- | -------------------------------------- |
| file-icon         | 文件类型图标                           |
| file-info         | 文件信息区域                           |
| file-info-main    | 文件信息主区域                         |
| file-name         | 文件名                                 |
| file-info-actions | 文件信息操作区域                       |
| file-progress     | 进度条                                 |
| file-response     | 错误响应文案                           |
| file-delete       | 删除图标                               |
| file-thumb        | 缩略图容器                             |
| file-toolbar      | 图片工具栏（仅 picture-card 模式）     |
| file-preview      | 预览图标（仅 picture-card 模式）       |
| card              | 卡片容器（仅 picture-card 模式）       |
| card-thumb        | 卡片缩略图区域（仅 picture-card 模式） |

### UploadFileItem CSS Custom Properties

| Name                                              | Description                          | Default                                                     |
| ------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------- |
| --ea-upload-file-item-card-width                  | 卡片宽度（仅 picture-card 模式）     | 148px                                                       |
| --ea-upload-file-item-card-height                 | 卡片高度（仅 picture-card 模式）     | 148px                                                       |
| --ea-upload-file-item-card-border                 | 卡片边框样式                         | var(--border-width) var(--border-style) var(--border-color) |
| --ea-upload-file-item-card-border-radius          | 卡片圆角                             | var(--border-radius)                                        |
| --ea-upload-file-item-card-bg                     | 卡片背景色                           | var(--color-white)                                          |
| --ea-upload-file-item-transition                  | 过渡动画                             | var(--transition-fast)                                      |
| --ea-upload-file-item-toolbar-bg                  | 工具栏背景色（仅 picture-card 模式） | rgba(0, 0, 0, 0.4)                                          |
| --ea-upload-file-item-toolbar-icon-color          | 工具栏图标颜色                       | var(--color-white)                                          |
| --ea-upload-file-item-toolbar-icon-size           | 工具栏图标大小                       | var(--font-size-lg)                                         |
| --ea-upload-file-item-thumb-error-color           | 缩略图加载失败图标颜色               | var(--red-500)                                              |
| --ea-upload-file-item-thumb-placeholder-color     | 缩略图占位图标颜色                   | var(--grey-400)                                             |
| --ea-upload-file-item-thumb-placeholder-font-size | 缩略图占位图标大小                   | var(--font-size-lg)                                         |
| --ea-upload-file-item-thumb-bg                    | 缩略图背景色                         | var(--grey-100)                                             |
| --ea-upload-file-item-response-color              | 错误响应文案颜色                     | var(--red-500)                                              |
| --ea-upload-file-item-response-font-size          | 错误响应文案字体大小                 | var(--font-size-xs)                                         |
