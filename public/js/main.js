$(document).ready(() => {
  $('.edit-recipe').on('click', function(){
    $('#edit-form-id').val($(this).data('id'));
    $('#edit-form-name').val($(this).data('name'));
    $('#edit-form-ingredients').val($(this).data('ingredients'));
    $('#edit-form-directions').val($(this).data('directions'));
  });

  $('.delete-recipe').on('click', function(){
    let id = $(this).data('id');
    let url = `/delete/${id}`;
    if(confirm('Delete Recipe?')){
      $.ajax({
        url: url,
        type: 'DELETE',
        success: (result) => {
          console.log('Deleting Recipe...');
          window.location.href = '/';
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  });
});
