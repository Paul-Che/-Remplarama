class BookingPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def show?
    true
  end

  def create?
    true
  end

  def confirm?
    user.id == record.slots.first.user_id
  end

  def reject?
    true # A mettre à jour
  end

  def update?
    true # A mettre à jour
  end

  def destroy?
    user_is_owner_or_admin
  end

  def index_accepted_bookings?
    true
  end

  def index_finished_bookings?
    true
  end

  def index_sent_requests?
    true
  end

  def index_received_requests?
    true
  end

  private

  def user_is_owner_or_admin
    record.user == user || user.admin?
  end
end
